export type NomineeInput = {
  categoryId: string;
  subCategoryId: string;
  contactName: string;
  companyName: string;
  contactEmail: string;
  mobileNo?: string;
};

export type NominationCategory = {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
};

export type NominationSubcategory = {
  id: string;
  name: string;
  categoryId: string | { id: string; name: string; slug: string };
  isActive: boolean;
  sortOrder: number;
};

export type NominationSubmissionInput = {
  nominatorName: string;
  nominatorCompany: string;
  nominatorCity: string;
  nominatorContact?: string;
  nominatorEmail: string;
  nominees: NomineeInput[];
};

/** Matches backend SubmitNominationDto (Postman). */
export type SubmitNominationApiBody = {
  nominatorName: string;
  nominatorCompany: string;
  nominatorCity: string;
  nominatorPhone?: string;
  nominatorEmail: string;
  nominees: {
    categoryId: string;
    subCategoryId: string;
    contactName: string;
    companyName: string;
    contactEmail: string;
    mobileNo?: string;
  }[];
};

export type NominationResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

export type NominationStatusResponse = {
  success?: boolean;
  message?: string;
  data?: {
    isActive?: boolean;
    nominationActive?: boolean;
  };
};
