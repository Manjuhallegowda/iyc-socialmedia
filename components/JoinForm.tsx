import React, { useEffect, useReducer, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Send } from 'lucide-react'; // Added icons

/*
  Enhanced JoinForm.tsx
*/

// --- State and Reducer Definitions (Kept the same for robustness) ---

type State = {
  fullName: string;
  district: string;
  constituency: string;
  whatsapp: string;
  twitter: string;
  instagram: string;
  skills: Record<string, boolean>;
  motivation: string;
  consent: boolean;
  honeypot: string;
};

type Action =
  | { type: 'set'; key: keyof State; value: any }
  | { type: 'toggleSkill'; skill: string }
  | { type: 'reset' };

const SKILLS = [
  'Content Writing',
  'Video Editing',
  'Graphic Design',
  'Meme Making',
  'Field Reporting',
  'Coordination',
  'Data Entry',
  'Translation (Kannada)',
];

const initialSkills = SKILLS.reduce<Record<string, boolean>>((acc, s) => {
  acc[s] = false;
  return acc;
}, {});

const initialState: State = {
  fullName: '',
  district: '',
  constituency: '',
  whatsapp: '',
  twitter: '',
  instagram: '',
  skills: initialSkills,
  motivation: '',
  consent: false,
  honeypot: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return { ...state, [action.key]: action.value };
    case 'toggleSkill':
      return {
        ...state,
        skills: {
          ...state.skills,
          [action.skill]: !state.skills[action.skill],
        },
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function normalizePhone(input: string) {
  const digits = input.replace(/[^+0-9]/g, '');
  if (/^0[0-9]{9,}$/.test(digits)) {
    return '+91' + digits.replace(/^0+/, '');
  }
  if (!digits.startsWith('+') && digits.length === 10) {
    return '+91' + digits;
  }
  return digits;
}

function validateAll(state: State) {
  const errors: Record<string, string> = {};
  if (!state.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!state.district.trim()) errors.district = 'District is required.';
  if (!state.constituency.trim())
    errors.constituency = 'Assembly constituency is required.';
  if (!state.whatsapp.trim()) errors.whatsapp = 'WhatsApp number is required.';

  const phoneDigits = state.whatsapp.replace(/\D/g, '');
  if (phoneDigits && phoneDigits.length < 10)
    errors.whatsapp = 'Please enter a valid phone number (at least 10 digits).';

  if (!state.motivation.trim())
    errors.motivation = 'Tell us why you want to join.';
  if (!state.consent)
    errors.consent =
      'Consent is required to share your contact with district coordinators.';

  return errors;
}

export default function JoinForm() {
  // Removed 'Enhanced' from the export name
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedOk, setSubmittedOk] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // accessibility: id references
  const ids = {
    fullName: 'fullName',
    district: 'district',
    constituency: 'constituency',
    whatsapp: 'whatsapp',
    twitter: 'twitter',
    instagram: 'instagram',
    motivation: 'motivation',
    consent: 'consent',
  } as const;

  useEffect(() => {
    // live-validate whatsapp as user types (lightweight)
    if (!state.whatsapp) {
      setErrors((e) => ({ ...e, whatsapp: '' }));
      return;
    }
    const digits = state.whatsapp.replace(/\D/g, '');
    setErrors((e) => ({
      ...e,
      whatsapp: digits.length < 10 ? 'Phone looks short' : '',
    }));
  }, [state.whatsapp]);

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setServerMessage(null);

    // honeypot quick-check
    if (state.honeypot) {
      setServerMessage('Spam detected.');
      return;
    }

    const found = validateAll(state);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);

    const normalizedPhone = normalizePhone(state.whatsapp.trim());
    const payload = {
      fullName: state.fullName.trim(),
      district: state.district.trim(),
      constituency: state.constituency.trim(),
      whatsapp: normalizedPhone,
      twitter: state.twitter.trim(),
      instagram: state.instagram.trim(),
      skills: Object.keys(state.skills).filter((s) => state.skills[s]),
      motivation: state.motivation.trim(),
      consentText: `User consented on ${new Date().toISOString()}`,
      submittedAt: new Date().toISOString(),
    };

    // example POST with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s

    try {
      // NOTE: Replace '/api/volunteers' with your actual submission endpoint
      const resp = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(text || `Server responded ${resp.status}`);
      }

      setSubmittedOk(true);
      setServerMessage('Thanks - your details were submitted successfully.');
      // dispatch({ type: 'reset' }); // Removed reset on success to allow user to view successful message.
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setServerMessage(
          'Request timed out. Please check your connection and try again.'
        );
      } else {
        setServerMessage(
          err?.message ||
            'Submission failed due to a server error. Try again later.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedOk) {
    return (
      <div className="bg-green-100 border border-green-400 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-lg">
        <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Welcome to the Digital Army!
        </h3>
        <p className="text-green-700">
          Your details have been successfully registered. A coordinator from
          your district will reach out shortly via WhatsApp with next steps.
        </p>
        <div className="mt-4">
          <button
            onClick={() => {
              setSubmittedOk(false);
              dispatch({ type: 'reset' });
            }}
            className="mt-2 inline-flex items-center text-green-700 font-semibold underline hover:text-green-900"
          >
            Submit another volunteer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="bg-white p-0 rounded-xl shadow-2xl border border-gray-100 max-w-3xl mx-auto overflow-hidden"
        noValidate
      >
        {/* Form Header (India Green Branding) */}
        <div className="bg-green-700 text-white p-6">
          <h3 className="text-2xl font-extrabold flex items-center">
            <Send className="mr-3 w-5 h-5 text-orange-400" />
            Volunteer Details
          </h3>
          <p className="text-sm text-green-200 mt-1">
            All fields marked * are required.
          </p>
        </div>

        <div className="p-6">
          {/* Honeypot - hidden from users but visible to bots */}
          <label
            style={{
              position: 'absolute',
              left: -9999,
              top: 'auto',
              width: 1,
              height: 1,
              overflow: 'hidden',
            }}
            aria-hidden
          >
            Do not fill
            <input
              name="honeypot"
              value={state.honeypot}
              onChange={(e) =>
                dispatch({
                  type: 'set',
                  key: 'honeypot',
                  value: e.target.value,
                })
              }
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor={ids.fullName}
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                id={ids.fullName}
                name="fullName"
                value={state.fullName}
                onChange={(e) =>
                  dispatch({
                    type: 'set',
                    key: 'fullName',
                    value: e.target.value,
                  })
                }
                required
                autoComplete="name"
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName ? `${ids.fullName}-error` : undefined
                }
                className={`w-full px-4 py-2 border rounded-md text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-600 outline-none transition-shadow ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.fullName && (
                <p
                  id={`${ids.fullName}-error`}
                  className="text-xs text-red-600 mt-1 flex items-center"
                >
                  <X className="w-3 h-3 mr-1" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label
                htmlFor={ids.whatsapp}
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                WhatsApp Number *
              </label>
              <input
                id={ids.whatsapp}
                name="whatsapp"
                value={state.whatsapp}
                onChange={(e) =>
                  dispatch({
                    type: 'set',
                    key: 'whatsapp',
                    value: e.target.value,
                  })
                }
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 99999 99999"
                aria-invalid={!!errors.whatsapp}
                aria-describedby={
                  errors.whatsapp ? `${ids.whatsapp}-error` : undefined
                }
                className={`w-full px-4 py-2 border rounded-md text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-600 outline-none transition-shadow ${
                  errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.whatsapp && (
                <p
                  id={`${ids.whatsapp}-error`}
                  className="text-xs text-red-600 mt-1 flex items-center"
                >
                  <X className="w-3 h-3 mr-1" /> {errors.whatsapp}
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label
                htmlFor={ids.district}
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                District *
              </label>
              <input
                id={ids.district}
                name="district"
                value={state.district}
                onChange={(e) =>
                  dispatch({
                    type: 'set',
                    key: 'district',
                    value: e.target.value,
                  })
                }
                required
                autoComplete="address-level2"
                className={`w-full px-4 py-2 border rounded-md text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-600 outline-none transition-shadow ${
                  errors.district ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Bangalore Urban"
              />
            </div>

            {/* Assembly Constituency */}
            <div>
              <label
                htmlFor={ids.constituency}
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Assembly Constituency *
              </label>
              <input
                id={ids.constituency}
                name="constituency"
                value={state.constituency}
                onChange={(e) =>
                  dispatch({
                    type: 'set',
                    key: 'constituency',
                    value: e.target.value,
                  })
                }
                required
                className={`w-full px-4 py-2 border rounded-md text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-600 outline-none transition-shadow ${
                  errors.constituency ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Jayanagar"
              />
            </div>

            {/* Twitter / X Handle */}
            <div>
              <label
                htmlFor={ids.twitter}
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Twitter / X Handle (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-bold">
                  @
                </span>
                <input
                  id={ids.twitter}
                  name="twitter"
                  value={state.twitter}
                  onChange={(e) =>
                    dispatch({
                      type: 'set',
                      key: 'twitter',
                      value: e.target.value,
                    })
                  }
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-600 outline-none transition-shadow"
                  placeholder="username"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Instagram Handle */}
            <div>
              <label
                htmlFor={ids.instagram}
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Instagram Handle (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-bold">
                  @
                </span>
                <input
                  id={ids.instagram}
                  name="instagram"
                  value={state.instagram}
                  onChange={(e) =>
                    dispatch({
                      type: 'set',
                      key: 'instagram',
                      value: e.target.value,
                    })
                  }
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-600 outline-none transition-shadow"
                  placeholder="username"
                />
              </div>
            </div>

            {/* Key Skills */}
            <div className="md:col-span-2">
              <fieldset className="border border-gray-300 rounded-lg p-4 bg-gray-50/50">
                <legend className="text-sm font-bold text-gray-700 px-2">
                  Key Skills (Select all that apply)
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                  {SKILLS.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center space-x-2 p-2 border rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                        state.skills[skill]
                          ? 'bg-green-100 border-green-700 text-green-800'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!state.skills[skill]}
                        onChange={() =>
                          dispatch({ type: 'toggleSkill', skill })
                        }
                        aria-checked={!!state.skills[skill]}
                        className="rounded-full w-4 h-4 border-green-700 text-green-700 focus:ring-green-500"
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Motivation Textarea */}
          <div className="mt-6">
            <label
              htmlFor={ids.motivation}
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Why do you want to join the Social Media team? *
            </label>
            <textarea
              id={ids.motivation}
              name="motivation"
              rows={4}
              value={state.motivation}
              onChange={(e) =>
                dispatch({
                  type: 'set',
                  key: 'motivation',
                  value: e.target.value,
                })
              }
              required
              aria-invalid={!!errors.motivation}
              aria-describedby={
                errors.motivation ? `${ids.motivation}-error` : undefined
              }
              className={`w-full px-4 py-2 border rounded-md text-black placeholder-gray-500 focus:ring-2 focus:ring-orange-600 outline-none transition-shadow ${
                errors.motivation ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="I am passionate about democracy and believe in using digital platforms to share the truth..."
            />
            {errors.motivation && (
              <p
                id={`${ids.motivation}-error`}
                className="text-xs text-red-600 mt-1 flex items-center"
              >
                <X className="w-3 h-3 mr-1" /> {errors.motivation}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-start space-x-2">
              <input
                id={ids.consent}
                name="consent"
                type="checkbox"
                checked={state.consent}
                onChange={(e) =>
                  dispatch({
                    type: 'set',
                    key: 'consent',
                    value: e.target.checked,
                  })
                }
                className="mt-1 w-4 h-4 border-gray-300 rounded text-green-700 focus:ring-green-500"
                aria-describedby="consent-help"
              />
              <label htmlFor={ids.consent} className="text-sm text-gray-700">
                I consent to my information being shared with district
                coordinators for the purpose of volunteer coordination. See the{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-orange-600 underline hover:text-orange-800 font-semibold"
                >
                  privacy notice
                </button>
                . *
              </label>
            </div>

            {errors.consent && (
              <p className="text-xs text-red-600 mt-1 flex items-center">
                <X className="w-3 h-3 mr-1" /> {errors.consent}
              </p>
            )}
          </div>

          {/* Server Message / Error */}
          {serverMessage && (
            <div
              className={`mt-4 text-left text-sm p-3 rounded flex items-center ${
                serverMessage.includes('successful')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {serverMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-colors shadow-xl w-full md:w-2/3 flex items-center justify-center mx-auto ${
                submitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending Details...
                </>
              ) : (
                'Join Digital Army Now'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Privacy modal (simple) */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold mb-2 text-green-700">
              Privacy Notice
            </h3>
            <p className="text-sm text-gray-700 border-b pb-3 mb-3">
              We will use the contact information you provide only to connect
              you with a district coordinator and to manage volunteer activity.
              We will not sell your data. Your data is stored securely and is
              only accessible by the state coordinator team.
            </p>
            <p className="text-xs text-gray-500">
              You can request deletion by contacting the administrators listed
              on our site. By checking consent you agree to this usage.
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-4 py-2 rounded bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
              >
                Close
              </button>
            </div>
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
              aria-label="Close privacy notice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
