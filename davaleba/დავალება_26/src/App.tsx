import React, { useState, useRef } from "react";

/* ─── Types ─────────────────────────────────────────────────────── */
interface CardFormState {
  name: string;
  number: string;
  month: string;
  year: string;
  cvc: string;
}

interface FormErrors {
  name?: string;
  number?: string;
  month?: string;
  year?: string;
  cvc?: string;
}

/* ─── Helpers ───────────────────────────────────────────────────── */
/** Strip non-digits and limit length */
function digitsOnly(raw: string, maxLen: number): string {
  return raw.replace(/\D/g, "").slice(0, maxLen);
}

/**
 * Format 16 raw digits → "XXXX XXXX XXXX XXXX"
 * Pads with zeros if fewer than 16 digits are present.
 */
function displayCardNumber(raw: string): string {
  const padded = raw.padEnd(16, "0");
  return padded.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * Same as above but without padding — used in the input field so that the
 * displayed value matches what the user typed.
 */
function formatForInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

/* ─── Validation ────────────────────────────────────────────────── */
function validate(form: CardFormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name can't be blank";
  if (form.number.length < 16) errors.number = "Must be 16 digits";
  const month = parseInt(form.month, 10);
  if (!form.month || month < 1 || month > 12)
    errors.month = "Invalid month";
  if (!form.year || form.year.length < 2) errors.year = "Invalid year";
  if (form.cvc.length < 3) errors.cvc = "Must be 3 digits";
  return errors;
}

/* ─── Component ─────────────────────────────────────────────────── */
const emptyState: CardFormState = {
  name: "",
  number: "",
  month: "",
  year: "",
  cvc: "",
};

export default function CreditCardForm() {
  const [form, setForm] = useState<CardFormState>(emptyState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [cvcFocused, setCvcFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cvcRef = useRef<HTMLInputElement>(null);

  /* ── Derived display values ─────────────────────────────────── */
  const cardNumberDisplay = displayCardNumber(form.number);
  // Split into 4 groups of 4
  const groups = cardNumberDisplay.split(" ");

  const expiryDisplay =
    (form.month || "MM") + "/" + (form.year || "YY");

  /* ── Handlers ───────────────────────────────────────────────── */
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip spaces typed by the user before storing raw digits
    const raw = digitsOnly(e.target.value.replace(/\s/g, ""), 16);
    setForm((f) => ({ ...f, number: raw }));
    if (errors.number) setErrors((err) => ({ ...err, number: undefined }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({
      ...f,
      name: e.target.value.toUpperCase().slice(0, 26),
    }));
    if (errors.name) setErrors((err) => ({ ...err, name: undefined }));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, month: digitsOnly(e.target.value, 2) }));
    if (errors.month) setErrors((err) => ({ ...err, month: undefined }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, year: digitsOnly(e.target.value, 2) }));
    if (errors.year) setErrors((err) => ({ ...err, year: undefined }));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, cvc: digitsOnly(e.target.value, 3) }));
    if (errors.cvc) setErrors((err) => ({ ...err, cvc: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    console.log("Card submitted:", form);
  };

  const handleContinue = () => {
    setForm(emptyState);
    setErrors({});
    setSubmitted(false);
    setCvcFocused(false);
  };

  /* ── CVC display: show typed digits, pad remaining with "•" ── */
  const cvcDisplay =
    form.cvc.padEnd(3, "•");

  /* ─── Render ─────────────────────────────────────────────────── */
  return (
    <div className="page">
      <div className="container">
        {/* ── Card Preview ─────────────────────────────────────────── */}
        <div className="card-preview">
          <div className="card-stack">
            {/* Back card */}
            <div className="card-back">
              <div className="card-back__stripe" />
              <div className="card-back__cvc-row">
                <div>
                  <p className="card-back__cvc-label">CVC</p>
                  <div
                    className={`card-back__cvc-box${
                      cvcFocused ? " is-focused" : ""
                    }`}
                  >
                    {cvcDisplay}
                  </div>
                </div>
              </div>
            </div>

            {/* Front card */}
            <div className="card-front">
              {/* Decorative circles (chip placeholder) */}
              <div className="card-front__circles">
                <div className="card-front__circle-big" />
                <div className="card-front__circle-small" />
              </div>

              {/* Card number */}
              <div className="card-front__number">
                {groups.map((group, i) => (
                  <span key={i} className="card-front__number-group">
                    {group}
                  </span>
                ))}
              </div>

              {/* Name + Expiry */}
              <div className="card-front__footer">
                <span className="card-front__name">
                  {form.name || "JANE APPLESEED"}
                </span>
                <span className="card-front__expiry">{expiryDisplay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Form / Thank-you ──────────────────────────────────────── */}
        <div className="form-wrapper">
          {submitted ? (
            /* Thank-you screen */
            <div className="thankyou">
              <div className="thankyou__icon">
                <svg viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="thankyou__heading">Thank you!</h1>
              <p className="thankyou__sub">
                We've added your card details.
              </p>
              <button
                className="btn-continue"
                onClick={handleContinue}
                id="btn-continue"
              >
                Continue
              </button>
            </div>
          ) : (
            /* Payment form */
            <form
              className="form"
              onSubmit={handleSubmit}
              noValidate
              id="card-form"
            >
              {/* Cardholder Name */}
              <div className="field">
                <label htmlFor="card-name" className="field__label">
                  Cardholder Name
                </label>
                <input
                  id="card-name"
                  type="text"
                  className={`field__input${errors.name ? " has-error" : ""}`}
                  value={form.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Jane Appleseed"
                  autoComplete="cc-name"
                />
                {errors.name && (
                  <span className="field__error">{errors.name}</span>
                )}
              </div>

              {/* Card Number */}
              <div className="field">
                <label htmlFor="card-number" className="field__label">
                  Card Number
                </label>
                <input
                  id="card-number"
                  type="text"
                  inputMode="numeric"
                  className={`field__input${
                    errors.number ? " has-error" : ""
                  }`}
                  value={formatForInput(form.number)}
                  onChange={handleNumberChange}
                  placeholder="e.g. 0234 5678 0123 4567"
                  autoComplete="cc-number"
                />
                {errors.number && (
                  <span className="field__error">{errors.number}</span>
                )}
              </div>

              {/* Expiry + CVC row */}
              <div className="expiry-cvc-row">
                {/* Expiry */}
                <div className="field">
                  <label className="field__label">Exp. Date (MM/YY)</label>
                  <div className="expiry-inputs">
                    <div>
                      <input
                        id="card-month"
                        type="text"
                        inputMode="numeric"
                        className={`field__input${
                          errors.month ? " has-error" : ""
                        }`}
                        value={form.month}
                        onChange={handleMonthChange}
                        placeholder="MM"
                        autoComplete="cc-exp-month"
                      />
                      {errors.month && (
                        <span className="field__error">{errors.month}</span>
                      )}
                    </div>
                    <div>
                      <input
                        id="card-year"
                        type="text"
                        inputMode="numeric"
                        className={`field__input${
                          errors.year ? " has-error" : ""
                        }`}
                        value={form.year}
                        onChange={handleYearChange}
                        placeholder="YY"
                        autoComplete="cc-exp-year"
                      />
                      {errors.year && (
                        <span className="field__error">{errors.year}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CVC */}
                <div className="field" style={{ width: "100px" }}>
                  <label htmlFor="card-cvc" className="field__label">
                    CVC
                  </label>
                  <input
                    ref={cvcRef}
                    id="card-cvc"
                    type="text"
                    inputMode="numeric"
                    className={`field__input${errors.cvc ? " has-error" : ""}`}
                    value={form.cvc}
                    onChange={handleCvcChange}
                    onFocus={() => setCvcFocused(true)}
                    onBlur={() => setCvcFocused(false)}
                    placeholder="e.g. 123"
                    autoComplete="cc-csc"
                  />
                  {errors.cvc && (
                    <span className="field__error">{errors.cvc}</span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-submit" id="btn-confirm">
                Confirm
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
