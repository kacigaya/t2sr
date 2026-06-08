import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Image, Mail, MessageCircle, Phone, Upload, X } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { publicApiUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";

interface Errors {
  [key: string]: string;
}

const deadlines = [
  ["urgent", "Urgent"],
  ["1-mois", "Sous 1 mois"],
  ["3-mois", "Sous 3 mois"],
  ["flexible", "Flexible"],
] as const;

const budgets = [
  ["", "Non précisé"],
  ["moins-1000", "Moins de 1 000 €"],
  ["1000-3000", "1 000 € à 3 000 €"],
  ["3000-10000", "3 000 € à 10 000 €"],
  ["plus-10000", "Plus de 10 000 €"],
  ["a-definir", "À définir"],
] as const;

export function QuoteSection() {
  const phone = SITE.phone as string;
  const email = SITE.email as string;
  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined;
  const whatsappHref = phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : undefined;
  const emailHref = email ? `mailto:${email}` : undefined;

  return (
    <Section id="devis" className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-terracotta">Contact</p>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-ink lg:text-5xl">
            Recevoir votre devis gratuit
          </h2>
          <p className="mt-5 leading-8 text-copy">
            Décrivez votre chantier en Île-de-France. Plus votre demande est précise, plus le retour peut être clair.
          </p>
          <div className="mt-8 grid gap-3">
            <ContactButton icon={<Phone className="size-5" />} label="Appeler T2SR" href={telHref} />
            <ContactButton icon={<MessageCircle className="size-5" />} label="WhatsApp" href={whatsappHref} />
            <ContactButton icon={<Mail className="size-5" />} label="Envoyer un email" href={emailHref} />
          </div>
        </Reveal>
        <Reveal>
          <QuoteForm />
        </Reveal>
      </Container>
    </Section>
  );
}

function ContactButton({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  return (
    <a
      href={href ?? "#devis"}
      className="flex items-center gap-3 font-extrabold text-ink transition hover:text-terracotta"
    >
      <span className="text-terracotta">{icon}</span>
      {label}
      {!href && <span className="ml-auto text-xs text-copy">à compléter</span>}
    </a>
  );
}

function QuoteForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<PreviewFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const serviceOptions = useMemo(() => SERVICES, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setMessage("");

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch(`${publicApiUrl()}/api/quotes`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de l’envoi.");
      }
      form.reset();
      setSelectedFiles([]);
      setStatus("success");
      setMessage("Votre demande a bien été envoyée. T2SR reviendra vers vous dès que possible.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erreur lors de l’envoi.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom et prénom" error={errors.fullName} required>
          <Input name="fullName" autoComplete="name" required aria-invalid={Boolean(errors.fullName)} />
        </Field>
        <Field label="Téléphone" error={errors.phone} required>
          <Input name="phone" type="tel" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} />
        </Field>
        <Field label="Email" error={errors.email} required>
          <Input name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Type de client" error={errors.customerType} required>
          <NativeSelect name="customerType" required aria-invalid={Boolean(errors.customerType)}>
            <option value="">Sélectionnez</option>
            <option value="particulier">Particulier</option>
            <option value="professionnel">Professionnel</option>
          </NativeSelect>
        </Field>
        <Field label="Service souhaité" error={errors.workType} required>
          <NativeSelect name="workType" required aria-invalid={Boolean(errors.workType)}>
            <option value="">Sélectionnez</option>
            {serviceOptions.map((service) => (
              <option key={service.slug} value={service.slug}>{service.title}</option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Ville du chantier" error={errors.city} required>
          <Input name="city" autoComplete="address-level2" required aria-invalid={Boolean(errors.city)} />
        </Field>
        <Field label="Délai souhaité" error={errors.deadline} required>
          <NativeSelect name="deadline" required aria-invalid={Boolean(errors.deadline)}>
            <option value="">Sélectionnez</option>
            {deadlines.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </NativeSelect>
        </Field>
        <Field label="Budget approximatif optionnel">
          <NativeSelect name="budget">
            {budgets.map(([value, label]) => <option key={label} value={value}>{label}</option>)}
          </NativeSelect>
        </Field>
      </div>
      <div className="mt-5 grid gap-5">
        <Field label="Message" error={errors.description} required>
          <Textarea name="description" maxLength={2000} required aria-invalid={Boolean(errors.description)} />
        </Field>
        <PhotoUpload
          ref={fileInputRef}
          error={errors.files}
          files={selectedFiles}
          onFilesChange={setSelectedFiles}
        />
        <div className="grid gap-3">
          <label className="group flex cursor-pointer items-start gap-3 rounded-xl p-1 text-sm font-bold text-copy">
            <span className="relative mt-0.5 flex size-[18px] shrink-0 items-center justify-center">
              <input
                name="consent"
                value="true"
                type="checkbox"
                className="peer sr-only"
              />
              <span className="absolute inset-0 rounded-md border border-ink/25 bg-white transition peer-checked:border-terracotta peer-checked:bg-terracotta peer-focus-visible:ring-2 peer-focus-visible:ring-terracotta/40 peer-focus-visible:ring-offset-1" />
              <svg
                className="relative z-10 size-3 text-white opacity-0 transition peer-checked:opacity-100"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              J'accepte d'être recontacté concernant ma demande et j'ai lu la{" "}
              <a href="/politique-confidentialite" className="font-black text-terracotta underline underline-offset-2 transition hover:text-terracotta/80" target="_blank" rel="noopener noreferrer">
                politique de confidentialité
              </a>.
              {errors.consent && <span className="mt-1 block text-xs text-red-600">{errors.consent}</span>}
            </span>
          </label>
        </div>
        {message && (
          <div className={status === "success" ? "rounded-xl bg-green-50 p-4 text-sm font-bold text-green-700" : "rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700"} role="status">
            {message}
          </div>
        )}
        <Button type="submit" disabled={status === "sending"} className="w-full">
          {status === "sending" ? "Envoi en cours..." : <strong>Recevoir mon devis gratuit</strong>}
        </Button>
      </div>
    </form>
  );
}

interface PreviewFile {
  id: string;
  file: File;
  preview: string;
}

function PhotoUpload({
  error,
  files,
  onFilesChange,
  ref,
}: {
  error?: string;
  files: PreviewFile[];
  onFilesChange: React.Dispatch<React.SetStateAction<PreviewFile[]>>;
  ref: React.RefObject<HTMLInputElement | null>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const filesRef = useRef(files);
  const maxFiles = 5;
  const maxSizeMB = 5;
  const accept = "image/jpeg,image/png,image/webp";

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    return () => {
      for (const item of filesRef.current) URL.revokeObjectURL(item.preview);
    };
  }, []);

  function syncInput(nextFiles: PreviewFile[]) {
    const input = ref.current;
    if (!input) return;
    const transfer = new DataTransfer();
    for (const item of nextFiles) transfer.items.add(item.file);
    input.files = transfer.files;
  }

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList).filter((file) => file.size > 0);
    onFilesChange((current) => {
      const availableSlots = Math.max(0, maxFiles - current.length);
      const nextItems = incoming.slice(0, availableSlots).map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
      }));
      const next = [...current, ...nextItems];
      syncInput(next);
      return next;
    });
  }

  function removeFile(id: string) {
    onFilesChange((current) => {
      const removed = current.find((item) => item.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      const next = current.filter((item) => item.id !== id);
      syncInput(next);
      return next;
    });
  }

  function openFileDialog() {
    ref.current?.click();
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files) addFiles(event.currentTarget.files);
  }

  function onDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }

  function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    setIsDragging(false);
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  }

  return (
    <div className="grid gap-2 text-sm font-bold text-ink">
      <span>Photos optionnelles</span>
      <div
        className={
          "relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-ink/20 bg-white p-4 transition " +
          (isDragging ? "border-terracotta bg-terracotta/5 ring-4 ring-terracotta/15" : "hover:border-terracotta/70")
        }
        data-dragging={isDragging || undefined}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          ref={ref}
          className="sr-only"
          name="files"
          type="file"
          accept={accept}
          multiple
          aria-label="Ajouter des photos du chantier"
          onChange={onInputChange}
        />
        {files.length > 0 ? (
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {files.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl border border-ink/10 bg-soft">
                <img src={item.preview} alt={`Aperçu de ${item.file.name}`} className="aspect-[4/3] size-full object-cover" />
                <button
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-ink/75 text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                  type="button"
                  aria-label={`Retirer ${item.file.name}`}
                  onClick={() => removeFile(item.id)}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}
            {files.length < maxFiles && (
              <button
                className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink/20 bg-white p-4 text-center text-copy transition hover:border-terracotta hover:text-terracotta"
                type="button"
                onClick={openFileDialog}
              >
                <Upload className="size-5" aria-hidden="true" />
                Ajouter une photo
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full border border-ink/10 bg-soft" aria-hidden="true">
              <Image className="size-5 text-terracotta" />
            </div>
            <p className="mb-1.5 text-sm font-black text-ink">Déposez vos photos ici</p>
            <p className="text-xs font-semibold text-copy">JPG, PNG ou WebP, jusqu’à {maxFiles} fichiers de {maxSizeMB} Mo</p>
            <Button className="mt-4" type="button" variant="outline" onClick={openFileDialog}>
              <Upload className="size-4" aria-hidden="true" />
              Sélectionner des photos
            </Button>
          </div>
        )}
      </div>
      {error && (
        <span className="flex items-center gap-1 text-xs font-bold text-red-600" role="alert">
          <AlertCircle className="size-3" aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}

function validate(formData: FormData) {
  const errors: Errors = {};
  const required = ["fullName", "phone", "email", "customerType", "workType", "city", "deadline", "description"] as const;
  for (const field of required) {
    if (!String(formData.get(field) ?? "").trim()) errors[field] = "Champ obligatoire.";
  }
  const email = String(formData.get("email") ?? "");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email invalide.";
  const phone = String(formData.get("phone") ?? "");
  if (phone && !/^[+]?[\d\s().-]{6,20}$/.test(phone)) errors.phone = "Téléphone invalide.";
  if (!formData.get("consent")) errors.consent = "Le consentement est obligatoire.";
  const files = formData.getAll("files").filter((file): file is File => file instanceof File && file.size > 0);
  if (files.length > 5) errors.files = "Maximum 5 fichiers.";
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) errors.files = "Chaque fichier doit faire 5 Mo maximum.";
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) errors.files = "Formats acceptés : JPG, PNG ou WebP.";
  }
  return errors;
}
