import { API_ENDPOINTS } from '@/constants/api';
import {
  buildWebsiteAuthHeaders,
  clearWebsiteAuth,
  ensureWebsiteAuth,
  getApiErrorStatus,
} from '@/lib/website-auth';
import { apiFetch, ApiError } from '@/services/apiFetch';
import type {
  NominationStatusResponse,
  NominationResponse,
  NominationCategory,
  NominationSubcategory,
  NominationSubmissionInput,
  SubmitNominationApiBody,
} from '@/types/nominations.types';

type NominationCollectionResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T[];
};

export type NominationOptions = {
  categories: NominationCategory[];
  subcategories: NominationSubcategory[];
};

async function getNominationStatusResponse(): Promise<NominationStatusResponse> {
  const auth = await ensureWebsiteAuth();

  return apiFetch<NominationStatusResponse>(API_ENDPOINTS.WEBSITE.NOMINATION_STATUS, {
    method: 'GET',
    requireAuth: false,
    headers: {
      ...buildWebsiteAuthHeaders(auth),
      'x-website-domain': auth.domain,
    },
  });
}

function validateNominationCollection<T extends { id: string; name: string; isActive: boolean }>(
  response: NominationCollectionResponse<T>,
  resourceName: string,
): T[] {
  if (response.success !== true || !Array.isArray(response.data)) {
    throw new Error(response.message || `Unable to load nomination ${resourceName}.`);
  }

  if (
    response.data.some(
      (item) =>
        typeof item.id !== 'string' ||
        typeof item.name !== 'string' ||
        typeof item.isActive !== 'boolean',
    )
  ) {
    throw new Error(`The nomination ${resourceName} response has an invalid format.`);
  }

  return response.data.filter((item) => item.isActive);
}

async function getNominationOptionsResponse(): Promise<NominationOptions> {
  const auth = await ensureWebsiteAuth();
  const headers = {
    ...buildWebsiteAuthHeaders(auth),
    'x-website-domain': auth.domain,
  };
  const [categoriesResponse, subcategoriesResponse] = await Promise.all([
    apiFetch<NominationCollectionResponse<NominationCategory>>(
      API_ENDPOINTS.WEBSITE.NOMINATION_CATEGORIES,
      {
        method: 'GET',
        requireAuth: false,
        headers,
      },
    ),
    apiFetch<NominationCollectionResponse<NominationSubcategory>>(
      API_ENDPOINTS.WEBSITE.NOMINATION_SUBCATEGORIES,
      {
        method: 'GET',
        requireAuth: false,
        headers,
      },
    ),
  ]);

  const categories = validateNominationCollection(categoriesResponse, 'categories');
  const subcategories = validateNominationCollection(subcategoriesResponse, 'subcategories');

  if (
    subcategories.some((subcategory) => {
      const categoryId =
        typeof subcategory.categoryId === 'string'
          ? subcategory.categoryId
          : subcategory.categoryId?.id;
      return typeof categoryId !== 'string';
    })
  ) {
    throw new Error('The nomination subcategories response has an invalid category reference.');
  }

  return { categories, subcategories };
}

export async function fetchWebsiteNominationOptions(): Promise<NominationOptions> {
  try {
    return await getNominationOptionsResponse();
  } catch (error: unknown) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearWebsiteAuth();
    return getNominationOptionsResponse();
  }
}

function isNominationActive(response: NominationStatusResponse): boolean {
  return (
    response.success === true &&
    (response.data?.nominationActive ?? response.data?.isActive) === true
  );
}

export async function fetchWebsiteNominationStatus(): Promise<boolean> {
  try {
    return isNominationActive(await getNominationStatusResponse());
  } catch (error: unknown) {
    if (getApiErrorStatus(error) !== 401) {
      throw error;
    }

    clearWebsiteAuth();
    return isNominationActive(await getNominationStatusResponse());
  }
}

function buildSubmitNominationBody(input: NominationSubmissionInput): SubmitNominationApiBody {
  const body: SubmitNominationApiBody = {
    nominatorName: input.nominatorName.trim(),
    nominatorCompany: input.nominatorCompany.trim(),
    nominatorCity: input.nominatorCity.trim(),
    nominatorEmail: input.nominatorEmail.trim(),
    nominees: input.nominees.map((nominee) => ({
      categoryId: nominee.categoryId.trim(),
      subCategoryId: nominee.subCategoryId.trim(),
      contactName: nominee.contactName.trim(),
      companyName: nominee.companyName.trim(),
      contactEmail: nominee.contactEmail.trim(),
      ...(nominee.mobileNo?.trim() ? { mobileNo: nominee.mobileNo.trim() } : {}),
    })),
  };

  const phone = input.nominatorContact?.trim();
  if (phone) {
    body.nominatorPhone = phone;
  }

  return body;
}

function assertNominationSaved(response: NominationResponse) {
  if (response.success === false) {
    throw new Error(response.message || 'Nomination was not saved.');
  }
}

export function formatNominationErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const data = error.data;

    if (typeof data === 'object' && data !== null && 'message' in data) {
      const message = (data as { message?: unknown }).message;

      if (Array.isArray(message)) {
        return message.map(String).join(', ');
      }

      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Failed to submit nomination. Please try again.';
}

async function postNomination(body: SubmitNominationApiBody) {
  const auth = await ensureWebsiteAuth();

  return apiFetch<NominationResponse>(API_ENDPOINTS.WEBSITE.NOMINATIONS, {
    method: 'POST',
    requireAuth: false,
    headers: buildWebsiteAuthHeaders(auth),
    body: JSON.stringify(body),
  });
}

export async function submitWebsiteNomination(input: NominationSubmissionInput) {
  const body = buildSubmitNominationBody(input);

  try {
    const response = await postNomination(body);
    assertNominationSaved(response);
    return response;
  } catch (error: unknown) {
    const statusCode = getApiErrorStatus(error);

    if (statusCode === 401) {
      clearWebsiteAuth();
      const response = await postNomination(body);
      assertNominationSaved(response);
      return response;
    }

    throw new Error(formatNominationErrorMessage(error));
  }
}
