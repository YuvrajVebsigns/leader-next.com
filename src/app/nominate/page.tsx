// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// type CIOEntry = {
//   category: string;
//   name: string;
//   company: string;
//   email: string;
//   mobile: string;
// };

// type FormErrors = {
//   nominatorName?: string;
//   nominatorCompany?: string;
//   nominatorCity?: string;
//   nominatorEmail?: string;
//   nominatorContact?: string;
//   cios?: {
//     [key: number]: {
//       categoryId?: string;
//       name?: string;
//       company?: string;
//       email?: string;
//       mobile?: string;
//     };
//   };
// };

// export default function NominatePage() {
//   const [nominatorName, setNominatorName] = useState('');
//   const [nominatorCompany, setNominatorCompany] = useState('');
//   const [nominatorCity, setNominatorCity] = useState('');
//   const [nominatorContact, setNominatorContact] = useState('');
//   const [nominatorEmail, setNominatorEmail] = useState('');

//   const [cios, setCios] = useState<CIOEntry[]>([
//     {
//       category: '',
//       name: '',
//       company: '',
//       email: '',
//       mobile: '',
//     },
//   ]);

//   const [submitted, setSubmitted] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);
//   const [errors, setErrors] = useState<FormErrors>({});

//   const maxCios = 10;

//   const addCio = () => {
//     if (cios.length >= maxCios) return;

//     setCios((s) => [
//       ...s,
//       {
//         category: '',
//         name: '',
//         company: '',
//         email: '',
//         mobile: '',
//       },
//     ]);
//   };

//   const removeCio = (idx: number) => {
//     setCios((s) => s.filter((_, i) => i !== idx));
//     // Clean up dynamic dynamic index errors if a entry block gets deleted
//     if (errors.cios?.[idx]) {
//       const nextCioErrors = { ...errors.cios };
//       delete nextCioErrors[idx];
//       setErrors({ ...errors, cios: nextCioErrors });
//     }
//   };

//   const updateCio = (idx: number, key: keyof CIOEntry, value: string) => {
//     setCios((s) => s.map((c, i) => (i === idx ? { ...c, [key]: value } : c)));

//     // Clear dynamic error markers on typings
//     if (errors.cios?.[idx]?.[key]) {
//       setErrors({
//         ...errors,
//         cios: {
//           ...errors.cios,
//           [idx]: {
//             ...errors.cios[idx],
//             [key]: undefined,
//           },
//         },
//       });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const nameRegex = /^[A-Za-z\s]+$/;

//     const nextErrors: FormErrors = {};
//     let hasErrors = false;

//     /* NOMINATOR VALIDATIONS */
//     if (!nominatorName.trim()) {
//       nextErrors.nominatorName = 'Nominator name is required.';
//       hasErrors = true;
//     } else if (!nameRegex.test(nominatorName)) {
//       nextErrors.nominatorName = 'Only alphabets are allowed.';
//       hasErrors = true;
//     }

//     if (!nominatorCompany.trim()) {
//       nextErrors.nominatorCompany = 'Company name is required.';
//       hasErrors = true;
//     }

//     if (!nominatorCity.trim()) {
//       nextErrors.nominatorCity = 'City is required.';
//       hasErrors = true;
//     }

//     if (!nominatorEmail.trim()) {
//       nextErrors.nominatorEmail = 'Email is required.';
//       hasErrors = true;
//     } else if (!emailRegex.test(nominatorEmail)) {
//       nextErrors.nominatorEmail = 'Enter a valid email.';
//       hasErrors = true;
//     }

//     if (nominatorContact && !phoneRegex.test(nominatorContact)) {
//       nextErrors.nominatorContact = 'Enter a valid 10-digit phone number.';
//       hasErrors = true;
//     }

//     /* DYNAMIC CIO ENTRIES VALIDATIONS */
//     const cioErrorsMap: NonNullable<FormErrors['cios']> = {};

//     cios.forEach((c, idx) => {
//       const currentCioErrors: {
//         categoryId?: string;
//         name?: string;
//         company?: string;
//         email?: string;
//         mobile?: string;
//       } = {};

//       if (!c.category) {
//         currentCioErrors.category = 'Please select a category.';
//         hasErrors = true;
//       }

//       if (!c.name.trim()) {
//         currentCioErrors.name = 'CIO name is required.';
//         hasErrors = true;
//       } else if (!nameRegex.test(c.name)) {
//         currentCioErrors.name = 'Only alphabets are allowed.';
//         hasErrors = true;
//       }

//       if (!c.company.trim()) {
//         currentCioErrors.company = 'CIO company is required.';
//         hasErrors = true;
//       }

//       if (!c.email.trim()) {
//         currentCioErrors.email = 'Email is required.';
//         hasErrors = true;
//       } else if (!emailRegex.test(c.email)) {
//         currentCioErrors.email = 'Enter a valid email address.';
//         hasErrors = true;
//       }

//       if (c.mobile && !phoneRegex.test(c.mobile)) {
//         currentCioErrors.mobile = 'Enter a valid 10-digit mobile number.';
//         hasErrors = true;
//       }

//       if (Object.keys(currentCioErrors).length > 0) {
//         cioErrorsMap[idx] = currentCioErrors;
//       }
//     });

//     if (Object.keys(cioErrorsMap).length > 0) {
//       nextErrors.cios = cioErrorsMap;
//     }

//     setErrors(nextErrors);

//     if (hasErrors) {
//       setStatus('Please fix the errors marked in the form below.');
//       return;
//     }

//     // Processing submission
//     setStatus(null);
//     setSubmitted(true);
//   };

//   if (submitted) {
//     return (
//       <main className="nominate-page-container">
//         <section className="nominate-success-section">
//           <h1>CIO Power List 2026 — Nomination Received</h1>
//           <p>
//             Thank you. Your nomination has been recorded. You will receive a confirmation email
//             shortly and the nominated CIO(s) will be notified as described.
//           </p>
//           <p>
//             <Link href="/">Return to home</Link>
//           </p>
//         </section>
//       </main>
//     );
//   }

//   return (
//     <main className="nominate-page-container">
//       <section className="nominate-page-content">
//         <h1>CIO Power List 2026: Nominate the Nation’s Most Influential Technology Leaders</h1>

//         <p>
//           Your nomination plays a vital role in recognizing CIOs for the exemplary impact they have
//           created and in helping them qualify for the CIO Power List 2026, placing their work firmly
//           in the spotlight.
//         </p>

//         <h3>Categories</h3>
//         <p>
//           CIOs may be nominated under either of the following categories:{' '}
//           <strong>Business Icon</strong> or <strong>Technology Icon</strong>.
//         </p>

//         <h3>Nomination Process &amp; Confirmation</h3>
//         <p>
//           Once you submit your nomination, an automated process will trigger three confirmation
//           emails:
//         </p>
//         <ol>
//           <li>To the CIO Power List (CORE Media) team, sharing the nomination details.</li>
//           <li>To you, acknowledging and summarizing all your nominations.</li>
//           <li>
//             To each nominated CIO, informing them that they have been nominated by you for CIO Power
//             List 2026.
//           </li>
//         </ol>

//         <h3>Note</h3>
//         <ol>
//           <li>
//             All nominations are treated with strict confidentiality and will not be shared or
//             displayed on forums.
//           </li>
//           <li>CIOs are welcome to nominate themselves.</li>
//           <li>
//             For ICT vendors, there is no commercial or sponsorship obligation associated with
//             nominating.
//           </li>
//         </ol>

//         <div className="nominate-wrapper">
//           <div className="nominate-card">
//             <div className="nominate-card-header">NOMINATION FORM</div>

//             <div className="nominate-card-body">
//               <p className="nominate-sub">
//                 You can nominate up to 10 Influential CIOs by clicking on the &quot;Add CIO&quot;
//                 button.
//               </p>

//               <form id="nominate-form" onSubmit={handleSubmit} className="nominate-form" noValidate>
//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend">Nominator details</legend>

//                   {/* NOMINATOR NAME */}
//                   <label className="nominate-label">
//                     Name of the Nominator *
//                     <input
//                       value={nominatorName}
//                       onChange={(e) => {
//                         setNominatorName(e.target.value.replace(/[^A-Za-z\s]/g, ''));
//                         if (errors.nominatorName)
//                           setErrors({ ...errors, nominatorName: undefined });
//                       }}
//                       placeholder="Full Name"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorName && (
//                       <div className="registration-error">{errors.nominatorName}</div>
//                     )}
//                   </label>

//                   {/* COMPANY */}
//                   <label className="nominate-label">
//                     Name of the Nominator&apos;s Company *
//                     <input
//                       value={nominatorCompany}
//                       onChange={(e) => {
//                         setNominatorCompany(e.target.value);
//                         if (errors.nominatorCompany)
//                           setErrors({ ...errors, nominatorCompany: undefined });
//                       }}
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorCompany && (
//                       <div className="registration-error">{errors.nominatorCompany}</div>
//                     )}
//                   </label>

//                   {/* CITY */}
//                   <label className="nominate-label">
//                     Nominator City *
//                     <input
//                       value={nominatorCity}
//                       onChange={(e) => {
//                         setNominatorCity(e.target.value);
//                         if (errors.nominatorCity)
//                           setErrors({ ...errors, nominatorCity: undefined });
//                       }}
//                       placeholder="eg. Mumbai"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorCity && (
//                       <div className="registration-error">{errors.nominatorCity}</div>
//                     )}
//                   </label>

//                   {/* CONTACT */}
//                   <label className="nominate-label">
//                     Nominator Contact No
//                     <input
//                       type="tel"
//                       value={nominatorContact}
//                       onChange={(e) => {
//                         setNominatorContact(e.target.value.replace(/[^0-9]/g, ''));
//                         if (errors.nominatorContact)
//                           setErrors({ ...errors, nominatorContact: undefined });
//                       }}
//                       maxLength={10}
//                       placeholder="9876543210"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorContact && (
//                       <div className="registration-error">{errors.nominatorContact}</div>
//                     )}
//                   </label>

//                   {/* EMAIL */}
//                   <label className="nominate-label">
//                     Nominator Email ID *
//                     <input
//                       type="email"
//                       value={nominatorEmail}
//                       onChange={(e) => {
//                         setNominatorEmail(e.target.value);
//                         if (errors.nominatorEmail)
//                           setErrors({ ...errors, nominatorEmail: undefined });
//                       }}
//                       placeholder="abc@abc.com"
//                       className="nominate-input-field"
//                     />
//                     {errors.nominatorEmail && (
//                       <div className="registration-error">{errors.nominatorEmail}</div>
//                     )}
//                   </label>
//                 </fieldset>

//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend">CIO nominations (up to {maxCios})</legend>

//                   {cios.map((c, idx) => (
//                     <div key={idx} className="nominate-cio-block">
//                       <div className="nominate-cio-top">
//                         <strong className="nominate-cio-title">CIO {idx + 1}</strong>
//                         {cios.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeCio(idx)}
//                             className="nominate-remove-btn"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>

//                       {/* CATEGORY */}
//                       <label className="nominate-label">
//                         Nominated CIO by Category *
//                         <select
//                           value={c.category}
//                           onChange={(e) => updateCio(idx, 'category', e.target.value)}
//                           className="nominate-input-field"
//                         >
//                           <option value="">- Select Category -</option>
//                           <option value="Business Icon">Business Icon</option>
//                           <option value="Technology Icon">Technology Icon</option>
//                         </select>
//                         {errors.cios?.[idx]?.category && (
//                           <div className="registration-error">{errors.cios[idx].category}</div>
//                         )}
//                       </label>

//                       {/* CIO NAME */}
//                       <label className="nominate-label">
//                         CIO Contact Name *
//                         <input
//                           value={c.name}
//                           onChange={(e) =>
//                             updateCio(idx, 'name', e.target.value.replace(/[^A-Za-z\s]/g, ''))
//                           }
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.name && (
//                           <div className="registration-error">{errors.cios[idx].name}</div>
//                         )}
//                       </label>

//                       {/* COMPANY */}
//                       <label className="nominate-label">
//                         CIO Company Name *
//                         <input
//                           value={c.company}
//                           onChange={(e) => updateCio(idx, 'company', e.target.value)}
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.company && (
//                           <div className="registration-error">{errors.cios[idx].company}</div>
//                         )}
//                       </label>

//                       {/* EMAIL */}
//                       <label className="nominate-label">
//                         Contact Email *
//                         <input
//                           type="email"
//                           value={c.email}
//                           onChange={(e) => updateCio(idx, 'email', e.target.value)}
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.email && (
//                           <div className="registration-error">{errors.cios[idx].email}</div>
//                         )}
//                       </label>

//                       {/* MOBILE */}
//                       <label className="nominate-label">
//                         Mobile No.
//                         <input
//                           type="tel"
//                           value={c.mobile}
//                           onChange={(e) =>
//                             updateCio(idx, 'mobile', e.target.value.replace(/[^0-9]/g, ''))
//                           }
//                           maxLength={10}
//                           placeholder="9876543210"
//                           className="nominate-input-field"
//                         />
//                         {errors.cios?.[idx]?.mobile && (
//                           <div className="registration-error">{errors.cios[idx].mobile}</div>
//                         )}
//                       </label>
//                     </div>
//                   ))}
//                 </fieldset>

//                 <div className="nominate-add-wrap">
//                   <button
//                     type="button"
//                     onClick={addCio}
//                     disabled={cios.length >= maxCios}
//                     className="nominate-btn nominate-btn-add"
//                   >
//                     + Add CIO
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         <div className="nominate-submit-row">
//           {/* INLINE STATUS WARNING BOX */}
//           {status && (
//             <p className="registration-status" style={{ marginBottom: '15px', color: 'red' }}>
//               {status}
//             </p>
//           )}

//           <button
//             type="submit"
//             form="nominate-form"
//             className="nominate-btn nominate-btn-primary nominate-submit"
//             aria-label="Submit nomination"
//           >
//             Submit
//           </button>

//           <small className="nominate-submit-note">
//             By submitting you agree that nominated CIOs will be contacted. All nominations are
//             confidential.
//           </small>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Country } from 'react-phone-number-input';
import CountryCodeSelect, { getDialCodeFromCountry } from '@/components/CountryCodeSelect';
import CustomDropdown from '@/components/CustomDropdown';
import { MONGODB_ID_REGEX } from '@/constants/nominations.constants';
import {
  fetchWebsiteNominationOptions,
  fetchWebsiteNominationStatus,
  submitWebsiteNomination,
} from '@/services/nominations.service';
import type { NominationCategory, NominationSubcategory } from '@/types/nominations.types';

type CIOEntry = {
  categoryId: string;
  subCategoryId: string;
  countryCode: Country;
  name: string;
  company: string;
  email: string;
  mobile: string;
};

type FormErrors = {
  nominatorName?: string;
  nominatorCompany?: string;
  nominatorCity?: string;
  nominatorEmail?: string;
  nominatorContact?: string;
  cios?: {
    [key: number]: {
      categoryId?: string;
      subCategoryId?: string;
      name?: string;
      company?: string;
      email?: string;
      mobile?: string;
    };
  };
};

function getSubcategoryCategoryId(subcategory: NominationSubcategory): string {
  return typeof subcategory.categoryId === 'string'
    ? subcategory.categoryId
    : subcategory.categoryId.id;
}

export default function NominatePage() {
  const [nominatorName, setNominatorName] = useState('');
  const [nominatorCompany, setNominatorCompany] = useState('');
  const [nominatorCity, setNominatorCity] = useState('');
  const [nominatorContact, setNominatorContact] = useState('');
  const [nominatorCountry, setNominatorCountry] = useState<Country>('IN');
  const [nominatorEmail, setNominatorEmail] = useState('');

  const [cios, setCios] = useState<CIOEntry[]>([
    {
      categoryId: '',
      subCategoryId: '',
      countryCode: 'IN',
      name: '',
      company: '',
      email: '',
      mobile: '',
    },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nominationAvailability, setNominationAvailability] = useState<
    'checking' | 'open' | 'closed' | 'error'
  >('checking');
  const [nominationStatusError, setNominationStatusError] = useState<string | null>(null);
  const [statusCheckAttempt, setStatusCheckAttempt] = useState(0);
  const [nominationCategories, setNominationCategories] = useState<NominationCategory[]>([]);
  const [nominationSubcategories, setNominationSubcategories] = useState<NominationSubcategory[]>(
    [],
  );
  const [nominationOptionsLoading, setNominationOptionsLoading] = useState(true);
  const [nominationOptionsError, setNominationOptionsError] = useState<string | null>(null);
  const [optionsLoadAttempt, setOptionsLoadAttempt] = useState(0);

  const [animatingCioIndex, setAnimatingCioIndex] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

  const maxCios = 10;

  useEffect(() => {
    let isMounted = true;

    async function checkNominationAvailability() {
      setNominationAvailability('checking');
      setNominationStatusError(null);

      try {
        const isActive = await fetchWebsiteNominationStatus();
        if (isMounted) {
          setNominationAvailability(isActive ? 'open' : 'closed');
        }
      } catch (error: unknown) {
        if (!isMounted) return;

        setNominationStatusError(
          error instanceof Error ? error.message : 'Unable to check nomination status.',
        );
        setNominationAvailability('error');
      }
    }

    checkNominationAvailability();

    return () => {
      isMounted = false;
    };
  }, [statusCheckAttempt]);

  useEffect(() => {
    let isMounted = true;

    async function loadNominationOptions() {
      setNominationOptionsLoading(true);
      setNominationOptionsError(null);

      try {
        const options = await fetchWebsiteNominationOptions();
        if (isMounted) {
          setNominationCategories(options.categories);
          setNominationSubcategories(options.subcategories);
        }
      } catch (error: unknown) {
        if (isMounted) {
          setNominationOptionsError(
            error instanceof Error ? error.message : 'Unable to load nomination categories.',
          );
        }
      } finally {
        if (isMounted) {
          setNominationOptionsLoading(false);
        }
      }
    }

    loadNominationOptions();

    return () => {
      isMounted = false;
    };
  }, [optionsLoadAttempt]);

  const addCio = () => {
    if (cios.length >= maxCios) return;

    setCios((prev) => {
      const newIndex = prev.length;

      setTimeout(() => {
        setAnimationType('add');
        setAnimatingCioIndex(newIndex);

        setTimeout(() => {
          setAnimatingCioIndex(null);
          setAnimationType(null);
        }, 800);
      }, 10);

      return [
        ...prev,
        {
          categoryId: '',
          subCategoryId: '',
          countryCode: 'IN',
          name: '',
          company: '',
          email: '',
          mobile: '',
        },
      ];
    });
  };

  const removeCio = (idx: number) => {
    setAnimationType('remove');
    setAnimatingCioIndex(idx);

    setTimeout(() => {
      setCios((prev) => prev.filter((_, i) => i !== idx));

      if (errors.cios?.[idx]) {
        const nextCioErrors = { ...errors.cios };
        delete nextCioErrors[idx];
        setErrors({ ...errors, cios: nextCioErrors });
      }

      setAnimatingCioIndex(null);
      setAnimationType(null);
    }, 600);
  };

  const updateCio = (idx: number, key: Exclude<keyof CIOEntry, 'countryCode'>, value: string) => {
    setCios((prev) => prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c)));

    if (errors.cios?.[idx]?.[key]) {
      setErrors({
        ...errors,
        cios: {
          ...errors.cios,
          [idx]: {
            ...errors.cios[idx],
            [key]: undefined,
          },
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nominationAvailability !== 'open') return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    const nextErrors: FormErrors = {};
    let hasErrors = false;

    if (!nominatorName.trim()) {
      nextErrors.nominatorName = 'Nominator name is required.';
      hasErrors = true;
    } else if (!nameRegex.test(nominatorName)) {
      nextErrors.nominatorName = 'Only alphabets are allowed.';
      hasErrors = true;
    }

    if (!nominatorCompany.trim()) {
      nextErrors.nominatorCompany = 'Company name is required.';
      hasErrors = true;
    }

    if (!nominatorCity.trim()) {
      nextErrors.nominatorCity = 'City is required.';
      hasErrors = true;
    }

    if (!nominatorEmail.trim()) {
      nextErrors.nominatorEmail = 'Email is required.';
      hasErrors = true;
    } else if (!emailRegex.test(nominatorEmail)) {
      nextErrors.nominatorEmail = 'Enter a valid email.';
      hasErrors = true;
    }

    if (nominatorContact && !phoneRegex.test(nominatorContact)) {
      nextErrors.nominatorContact = 'Enter a valid 10-digit phone number.';
      hasErrors = true;
    }

    const cioErrorsMap: NonNullable<FormErrors['cios']> = {};

    cios.forEach((c, idx) => {
      const currentCioErrors: NonNullable<FormErrors['cios']>[number] = {};

      if (!c.categoryId) {
        currentCioErrors.categoryId = 'Please select a category.';
        hasErrors = true;
      } else if (!MONGODB_ID_REGEX.test(c.categoryId)) {
        currentCioErrors.categoryId = 'Invalid category. Please select again.';
        hasErrors = true;
      }

      if (c.categoryId && !c.subCategoryId) {
        currentCioErrors.subCategoryId = 'Please select a subcategory.';
        hasErrors = true;
      }

      if (!c.name.trim()) {
        currentCioErrors.name = 'CIO name is required.';
        hasErrors = true;
      } else if (!nameRegex.test(c.name)) {
        currentCioErrors.name = 'Only alphabets are allowed.';
        hasErrors = true;
      }

      if (!c.company.trim()) {
        currentCioErrors.company = 'CIO company is required.';
        hasErrors = true;
      }

      if (!c.email.trim()) {
        currentCioErrors.email = 'Email is required.';
        hasErrors = true;
      } else if (!emailRegex.test(c.email)) {
        currentCioErrors.email = 'Enter a valid email address.';
        hasErrors = true;
      }

      if (c.mobile && !phoneRegex.test(c.mobile)) {
        currentCioErrors.mobile = 'Enter a valid 10-digit mobile number.';
        hasErrors = true;
      }

      if (Object.keys(currentCioErrors).length > 0) {
        cioErrorsMap[idx] = currentCioErrors;
      }
    });

    if (Object.keys(cioErrorsMap).length > 0) {
      nextErrors.cios = cioErrorsMap;
    }

    setErrors(nextErrors);

    if (hasErrors) {
      setStatus('Please fix the errors marked in the form below.');
      return;
    }

    setStatus(null);
    setIsSubmitting(true);

    try {
      const isStillActive = await fetchWebsiteNominationStatus();
      if (!isStillActive) {
        setNominationAvailability('closed');
        return;
      }

      const response = await submitWebsiteNomination({
        nominatorName,
        nominatorCompany,
        nominatorCity,
        nominatorContact: nominatorContact
          ? `${getDialCodeFromCountry(nominatorCountry)}${nominatorContact}`
          : '',
        nominatorEmail,
        nominees: cios.map((cio) => ({
          categoryId: cio.categoryId,
          subCategoryId: cio.subCategoryId,
          contactName: cio.name,
          companyName: cio.company,
          contactEmail: cio.email,
          mobileNo: cio.mobile ? `${getDialCodeFromCountry(cio.countryCode)}${cio.mobile}` : '',
        })),
      });

      const apiMessage =
        response && typeof response === 'object' && 'message' in response
          ? String((response as { message?: string }).message)
          : '';

      if (apiMessage) {
        setStatus(apiMessage);
      }

      setSubmitted(true);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Failed to submit nomination. Please try again.',
      );
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (nominationAvailability === 'checking') {
    return (
      <main className="nominate-page-container" aria-busy="true">
        <div className="nomination-status-loader" role="status">
          <span className="nomination-status-spinner" aria-hidden="true" />
          {/* <span>Checking nomination availability...</span> */}
        </div>
      </main>
    );
  }

  if (nominationAvailability === 'closed') {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section">
          <h1>Nominations are closed</h1>
          <p>We are not accepting nominations at this time.</p>
          <p>
            <Link href="/">Return to home</Link>
          </p>
        </section>
      </main>
    );
  }

  if (nominationAvailability === 'error') {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section" role="alert">
          <h1>Unable to check nomination status</h1>
          <p>{nominationStatusError}</p>
          <button
            type="button"
            className="nominate-btn nominate-btn-primary"
            onClick={() => setStatusCheckAttempt((attempt) => attempt + 1)}
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section">
          <h1>CIO Power List 2026 — Nomination Received</h1>
          <p>
            Thank you. Your nomination has been recorded. You will receive a confirmation email
            shortly and the nominated CIO(s) will be notified as described.
          </p>
          <p>
            <Link href="/">Return to home</Link>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="nominate-page-container">
      <section className="nominate-page-content">
        <h1>CIO Power List 2026: Nominate the Nation&apos;s Most Influential Technology Leaders</h1>

        <div className="nominate-guidelines-card">
          <p>
            Your nomination plays a vital role in recognizing CIOs for the exemplary impact they
            have created and in helping them qualify for the CIO Power List 2026, placing their work
            firmly in the spotlight.
          </p>

          <h3>Categories</h3>
          <p>
            CIOs may be nominated under either of the following categories:{' '}
            <strong>Business Icon</strong> or <strong>Technology Icon</strong>.
          </p>

          <h3>Nomination Process &amp; Confirmation</h3>
          <p>
            Once you submit your nomination, an automated process will trigger three confirmation
            emails:
          </p>

          <ol>
            <li>To the CIO Power List (CORE Media) team, sharing the nomination details.</li>
            <li>To you, acknowledging and summarizing all your nominations.</li>
            <li>
              To each nominated CIO, informing them that they have been nominated by you for CIO
              Power List 2026.
            </li>
          </ol>

          <h3>Note</h3>
          <ol>
            <li>All nominations are treated with strict confidentiality.</li>
            <li>CIOs are welcome to nominate themselves.</li>
            <li>
              For ICT vendors, there is no commercial or sponsorship obligation associated with
              nominating.
            </li>
          </ol>
        </div>

        <div className="nominate-wrapper">
          <div className="nominate-card">
            <aside className="nominate-card-sidebar" aria-label="Nomination">
              NOMINATE
            </aside>

            <div className="nominate-card-main">
              <div className="nominate-card-header">NOMINATION FORM</div>

              <div className="nominate-card-body">
                <p className="nominate-sub">
                  You can nominate up to 10 ICT vendors by clicking on the &quot;Add ICT
                  Vendor&quot; button.
                </p>

                <form
                  id="nominate-form"
                  onSubmit={handleSubmit}
                  className="nominate-form"
                  noValidate
                >
                  {nominationOptionsError && (
                    <div className="registration-error" role="alert">
                      {nominationOptionsError}
                      <button
                        type="button"
                        className="nominate-btn nominate-btn-add"
                        onClick={() => setOptionsLoadAttempt((attempt) => attempt + 1)}
                      >
                        Retry loading categories
                      </button>
                    </div>
                  )}

                  <fieldset className="nominate-fieldset">
                    <legend className="nominate-legend">Nominator details</legend>

                    <label className="nominate-label">
                      CIO&apos;s Name *
                      <input
                        value={nominatorName}
                        onChange={(e) => {
                          setNominatorName(e.target.value.replace(/[^A-Za-z\s]/g, ''));
                          if (errors.nominatorName)
                            setErrors({ ...errors, nominatorName: undefined });
                        }}
                        placeholder="Full Name"
                        className="nominate-input-field"
                      />
                      {errors.nominatorName && (
                        <div className="registration-error">{errors.nominatorName}</div>
                      )}
                    </label>

                    <label className="nominate-label">
                      CIO&apos;s Company Name *
                      <input
                        value={nominatorCompany}
                        onChange={(e) => {
                          setNominatorCompany(e.target.value);
                          if (errors.nominatorCompany) {
                            setErrors({ ...errors, nominatorCompany: undefined });
                          }
                        }}
                        className="nominate-input-field"
                      />
                      {errors.nominatorCompany && (
                        <div className="registration-error">{errors.nominatorCompany}</div>
                      )}
                    </label>

                    <label className="nominate-label">
                      CIO&apos;s City *
                      <input
                        value={nominatorCity}
                        onChange={(e) => {
                          setNominatorCity(e.target.value);
                          if (errors.nominatorCity)
                            setErrors({ ...errors, nominatorCity: undefined });
                        }}
                        placeholder="eg. Dubai"
                        className="nominate-input-field"
                      />
                      {errors.nominatorCity && (
                        <div className="registration-error">{errors.nominatorCity}</div>
                      )}
                    </label>

                    <label className="nominate-label">
                      CIO&apos;s Email ID *
                      <input
                        type="email"
                        value={nominatorEmail}
                        onChange={(e) => {
                          setNominatorEmail(e.target.value);
                          if (errors.nominatorEmail) {
                            setErrors({ ...errors, nominatorEmail: undefined });
                          }
                        }}
                        placeholder="abc@abc.com"
                        className="nominate-input-field"
                      />
                      {errors.nominatorEmail && (
                        <div className="registration-error">{errors.nominatorEmail}</div>
                      )}
                    </label>

                    <label className="nominate-label">
                      CIO&apos;s Country Code
                      <CountryCodeSelect
                        id="nominate-country-code"
                        value={nominatorCountry}
                        disabled={isSubmitting}
                        onChange={(nextCountry) => {
                          setNominatorCountry(nextCountry ?? 'IN');
                        }}
                      />
                    </label>

                    <label className="nominate-label">
                      CIO&apos;s Contact Number
                      <input
                        type="tel"
                        value={nominatorContact}
                        onChange={(e) => {
                          setNominatorContact(e.target.value.replace(/[^0-9]/g, ''));
                          if (errors.nominatorContact) {
                            setErrors({ ...errors, nominatorContact: undefined });
                          }
                        }}
                        maxLength={10}
                        placeholder="9876543210"
                        className="nominate-input-field"
                      />
                      {errors.nominatorContact && (
                        <div className="registration-error">{errors.nominatorContact}</div>
                      )}
                    </label>
                  </fieldset>

                  <fieldset className="nominate-fieldset nominate-nominees">
                    <legend className="nominate-legend">You can recommend (up to {maxCios})</legend>

                    {cios.map((c, idx) => (
                      <div
                        key={idx}
                        className={`nominate-cio-block ${
                          animatingCioIndex === idx && animationType === 'add' ? 'cio-slide-in' : ''
                        } ${
                          animatingCioIndex === idx && animationType === 'remove'
                            ? 'cio-slide-out'
                            : ''
                        }`}
                      >
                        <div className="nominate-cio-top">
                          <strong className="nominate-cio-title">ICT Vendor {idx + 1}</strong>
                          {cios.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCio(idx)}
                              className="nominate-remove-btn"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <label className="nominate-label">
                          Recommended ICT Vendor by Category *
                          <CustomDropdown
                            id={`nominate-category-${idx}`}
                            ariaLabel="Recommended ICT Vendor by Category"
                            value={c.categoryId}
                            placeholder="Select Category"
                            options={nominationCategories.map((option) => ({
                              value: option.id,
                              label: option.name,
                            }))}
                            disabled={nominationOptionsLoading || isSubmitting}
                            onChange={(categoryId) => {
                              updateCio(idx, 'categoryId', categoryId);
                              updateCio(idx, 'subCategoryId', '');
                            }}
                          />
                          {errors.cios?.[idx]?.categoryId && (
                            <div className="registration-error">{errors.cios[idx].categoryId}</div>
                          )}
                        </label>

                        {c.categoryId && (
                          <label className="nominate-label">
                            Subcategory *
                            <CustomDropdown
                              id={`nominate-subcategory-${idx}`}
                              ariaLabel="Subcategory"
                              value={c.subCategoryId}
                              placeholder="Select Subcategory"
                              options={nominationSubcategories
                                .filter(
                                  (subcategory) =>
                                    getSubcategoryCategoryId(subcategory) === c.categoryId,
                                )
                                .map((subcategory) => ({
                                  value: subcategory.id,
                                  label: subcategory.name,
                                }))}
                              disabled={nominationOptionsLoading || isSubmitting}
                              onChange={(subcategoryId) =>
                                updateCio(idx, 'subCategoryId', subcategoryId)
                              }
                            />
                            {errors.cios?.[idx]?.subCategoryId && (
                              <div className="registration-error">
                                {errors.cios[idx].subCategoryId}
                              </div>
                            )}
                          </label>
                        )}

                        <label className="nominate-label">
                          ICT Vendor Contact Name *
                          <input
                            value={c.name}
                            onChange={(e) =>
                              updateCio(idx, 'name', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                            }
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.name && (
                            <div className="registration-error">{errors.cios[idx].name}</div>
                          )}
                        </label>

                        <label className="nominate-label">
                          ICT Company Name *
                          <input
                            value={c.company}
                            onChange={(e) => updateCio(idx, 'company', e.target.value)}
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.company && (
                            <div className="registration-error">{errors.cios[idx].company}</div>
                          )}
                        </label>

                        <label className="nominate-label">
                          Country Code
                          <CountryCodeSelect
                            id={`nominate-vendor-country-code-${idx}`}
                            value={c.countryCode}
                            disabled={isSubmitting}
                            onChange={(nextCountry) => {
                              setCios((prev) =>
                                prev.map((entry, entryIndex) =>
                                  entryIndex === idx
                                    ? { ...entry, countryCode: nextCountry ?? 'IN' }
                                    : entry,
                                ),
                              );
                            }}
                          />
                        </label>

                        <label className="nominate-label">
                          Contact Number
                          <input
                            type="tel"
                            value={c.mobile}
                            onChange={(e) =>
                              updateCio(idx, 'mobile', e.target.value.replace(/[^0-9]/g, ''))
                            }
                            maxLength={10}
                            placeholder="9XXXXXXXX0"
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.mobile && (
                            <div className="registration-error">{errors.cios[idx].mobile}</div>
                          )}
                        </label>

                        <label className="nominate-label">
                          Contact Email *
                          <input
                            type="email"
                            value={c.email}
                            onChange={(e) => updateCio(idx, 'email', e.target.value)}
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.email && (
                            <div className="registration-error">{errors.cios[idx].email}</div>
                          )}
                        </label>
                      </div>
                    ))}
                  </fieldset>

                  <div className="nominate-add-wrap">
                    <button
                      type="button"
                      onClick={addCio}
                      disabled={cios.length >= maxCios}
                      className="nominate-btn nominate-btn-add"
                    >
                      + Add CIO
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="nominate-submit-row">
          {status && (
            <p className="registration-status" style={{ marginBottom: '15px', color: 'red' }}>
              {status}
            </p>
          )}

          <button
            type="submit"
            form="nominate-form"
            className="nominate-btn nominate-btn-primary nominate-submit"
            aria-label="Submit nomination"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          <small className="nominate-submit-note">
            By submitting you agree that nominated CIOs will be contacted. All nominations are
            confidential.
          </small>
        </div>
      </section>
    </main>
  );
}
