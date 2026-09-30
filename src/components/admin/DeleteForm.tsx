import { Trash2 } from "lucide-react";
import { ActionButton } from "./client";

// Delete button in its own form (forms can't be nested inside the editor form).
export function DeleteForm({
  id,
  action,
  label,
  confirmMessage,
}: {
  id: string;
  action: (fd: FormData) => Promise<void>;
  label: string;
  confirmMessage: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <ActionButton variant="danger" confirmMessage={confirmMessage}>
        <Trash2 className="w-3.5 h-3.5" />
        {label}
      </ActionButton>
    </form>
  );
}
