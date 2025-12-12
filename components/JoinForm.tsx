import React, { useEffect, useReducer, useState } from 'react';

/*
  Enhanced JoinForm.tsx
  - TypeScript React single-file component
  - Controlled inputs, inline validation, accessibility improvements
  - Honeypot anti-bot field
  - Consent + privacy modal + consent timestamp stored with submission
  - Submit with timeout (AbortController) and proper error handling
  - Reset + ability to submit another volunteer
  - Replace `/api/volunteers` with your real endpoint

  Styling: keeps your Tailwind utility classes. Tailwind color tokens like `bg-navyBlue` and `bg-skyBlue`
  are presumed to exist from your design system. If not, replace them with standard classes.
*/

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
  // loose normalization: keep digits and optional leading +
  const digits = input.replace(/[^+0-9]/g, '');
  // if starts with 0 and length plausible for India, convert to +91
  if (/^0[0-9]{9,}$/.test(digits)) {
    return '+91' + digits.replace(/^0+/, '');
  }
  if (!digits.startsWith('+') && digits.length === 10) {
    // assume local Indian number
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

export default function JoinFormEnhanced() {
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
      setServerMessage('Thanks — your details were submitted successfully.');
      dispatch({ type: 'reset' });
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setServerMessage('Request timed out. Please try again.');
      } else {
        setServerMessage(err?.message || 'Submission failed. Try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedOk) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-2xl mx-auto shadow-lg">
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Welcome to the Team!
        </h3>
        <p className="text-green-700">
          Your details have been registered. A coordinator from your district
          will reach out shortly.
        </p>
        <div className="mt-4">
          <button
            onClick={() => setSubmittedOk(false)}
            className="mt-2 text-green-700 font-semibold underline hover:text-green-900"
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
        className="bg-navyBlue p-8 rounded-xl shadow-lg border-t-4 border-skyBlue max-w-3xl mx-auto"
        noValidate
      >
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
              dispatch({ type: 'set', key: 'honeypot', value: e.target.value })
            }
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor={ids.fullName}
              className="block text-sm font-bold text-white mb-1"
            >
              Full Name
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
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-800 focus:ring-2 focus:ring-skyBlue outline-none transition-shadow"
              placeholder="Enter your name"
            />
            {errors.fullName && (
              <p
                id={`${ids.fullName}-error`}
                className="text-xs text-red-600 mt-1"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={ids.district}
              className="block text-sm font-bold text-white mb-1"
            >
              District
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
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-800 focus:ring-2 focus:ring-skyBlue outline-none transition-shadow"
              placeholder="e.g. Bangalore Urban"
            />
          </div>

          <div>
            <label
              htmlFor={ids.constituency}
              className="block text-sm font-bold text-white mb-1"
            >
              Assembly Constituency
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
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-800 focus:ring-2 focus:ring-skyBlue outline-none transition-shadow"
              placeholder="e.g. Jayanagar"
            />
          </div>

          <div>
            <label
              htmlFor={ids.whatsapp}
              className="block text-sm font-bold text-white mb-1"
            >
              WhatsApp Number
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
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-800 focus:ring-2 focus:ring-skyBlue outline-none transition-shadow"
            />
            {errors.whatsapp && (
              <p
                id={`${ids.whatsapp}-error`}
                className="text-xs text-red-600 mt-1"
              >
                {errors.whatsapp}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={ids.twitter}
              className="block text-sm font-bold text-white mb-1"
            >
              Twitter / X Handle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-black font-bold">
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
                className="w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-800 focus:ring-2 focus:ring-skyBlue outline-none transition-shadow"
                placeholder="username"
                autoComplete="username"
                aria-describedby="twitter-help"
              />
            </div>
            <p id="twitter-help" className="text-xs text-gray-200 mt-1">
              Optional — include without the leading @
            </p>
          </div>

          <div>
            <label
              htmlFor={ids.instagram}
              className="block text-sm font-bold text-white mb-1"
            >
              Instagram Handle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-black font-bold">
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
                className="w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-800 focus:ring-2 focus:ring-skyBlue outline-none transition-shadow"
                placeholder="username"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <fieldset className="border border-gray-600 rounded p-3 bg-white">
              <legend className="text-sm font-bold text-black">
                Key Skills (Select all that apply)
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                {SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center space-x-2 p-2 border border-gray-400 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!state.skills[skill]}
                      onChange={() => dispatch({ type: 'toggleSkill', skill })}
                      aria-checked={!!state.skills[skill]}
                      className="rounded-sm w-4 h-4"
                    />
                    <span className="text-sm text-black font-bold">
                      {skill}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor={ids.motivation}
            className="block text-sm font-bold text-white mb-1"
          >
            Why do you want to join the Social Media team?
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
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-black placeholder-gray-800 focus:ring-2 focus:ring-skyBlue outline-none transition-shadow"
            placeholder="I want to help verify information..."
          />
          {errors.motivation && (
            <p
              id={`${ids.motivation}-error`}
              className="text-xs text-red-600 mt-1"
            >
              {errors.motivation}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-start space-x-2">
          <input
            id={ids.consent}
            name="consent"
            type="checkbox"
            checked={state.consent}
            onChange={(e) =>
              dispatch({ type: 'set', key: 'consent', value: e.target.checked })
            }
            className="mt-1 w-4 h-4"
            aria-describedby="consent-help"
          />
          <label htmlFor={ids.consent} className="text-sm text-white">
            I consent to my information being shared with district coordinators
            for the purpose of volunteer coordination. See the{' '}
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="underline"
            >
              privacy notice
            </button>
            .
          </label>
        </div>

        {errors.consent && (
          <p className="text-xs text-red-600 mt-1">{errors.consent}</p>
        )}

        {serverMessage && (
          <div className="mt-4 text-left text-sm text-yellow-100 bg-red-700/10 p-2 rounded">
            {serverMessage}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={submitting}
            className={`bg-skyBlue text-white px-8 py-3 rounded-full font-bold hover:bg-sky-600 transition-colors shadow-md w-full md:w-auto border border-white/20 ${
              submitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Submitting...' : 'Join Digital Army'}
          </button>
        </div>
      </form>

      {/* Privacy modal (simple) */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Privacy Notice</h3>
            <p className="text-sm text-gray-700">
              We will use the contact information you provide only to connect
              you with a district coordinator and to manage volunteer activity.
              We will not sell your data. You can request deletion by contacting
              the administrators listed on our site. By checking consent you
              agree to this usage.
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-4 py-2 rounded bg-skyBlue text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
