import { useEffect, useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendPartnerInquiry } from "@/lib/contact.functions";

// Tiny module-level store so any component can open the dialog without prop drilling.
let externalOpen: (() => void) | null = null;
export function openPartnerDialog() {
  externalOpen?.();
}

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  property: z.string().trim().min(1, "Required").max(160),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().min(7, "Invalid phone").max(40),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

type FormState = {
  name: string;
  property: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL: FormState = { name: "", property: "", email: "", phone: "", message: "" };

export function PartnerDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const sendInquiry = useServerFn(sendPartnerInquiry);

  useEffect(() => {
    externalOpen = () => {
      setSent(false);
      setForm(INITIAL);
      setErrors({});
      setSubmitError(null);
      setOpen(true);
    };
    return () => { externalOpen = null; };
  }, []);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await sendInquiry({
        data: {
          name: parsed.data.name,
          property: parsed.data.property,
          email: parsed.data.email,
          phone: parsed.data.phone,
          message: parsed.data.message || "",
        },
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong sending your inquiry. Please try again or email office@titansolutionsco.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg border-gold/30 bg-gradient-to-b from-card via-card to-ink shadow-[0_30px_80px_-20px_rgba(201,168,76,0.35)] overflow-hidden p-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative p-6 sm:p-8">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-3">
            <span className="gold-rule" />
            <span className="eyebrow">Become a Partner</span>
          </div>
          <DialogTitle className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
            Begin the <span className="italic gold-shimmer">conversation.</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us about your property. Someone will reach out to you within 24 hours.
          </DialogDescription>
        </DialogHeader>


        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto w-12 h-12 border border-gold rotate-45 grid place-items-center mb-4">
              <span className="-rotate-45 text-gold font-serif text-lg">✓</span>
            </div>
            <p className="font-serif text-2xl text-gold mb-2">Message ready to send.</p>
            <p className="text-sm text-muted-foreground">
              Your email client has opened with the details. We will respond shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 mt-2">
            <Field label="Name" error={errors.name}>
              <Input value={form.name} onChange={update("name")} maxLength={120} required />
            </Field>
            <Field label="Property / Hotel" error={errors.property}>
              <Input value={form.property} onChange={update("property")} maxLength={160} required />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email" error={errors.email}>
                <Input type="email" value={form.email} onChange={update("email")} maxLength={200} required />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <Input type="tel" value={form.phone} onChange={update("phone")} maxLength={40} required />
              </Field>
            </div>
            <Field label="Message (optional)" error={errors.message}>
              <Textarea value={form.message} onChange={update("message")} maxLength={1500} rows={4} />
            </Field>
            <button type="submit" className="btn-gold w-full mt-2">
              Send Inquiry
            </button>
          </form>
        )}
        </div>
      </DialogContent>

    </Dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[0.65rem] tracking-elite uppercase text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
