"use client";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/types/note";
import { createNewNotesRequest } from "@/api/note";
import { ApiResponse } from "@/types/api";
import { convApiRspToZodError, isZodError } from "@/utils/error/zod";

const NewNotesFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  receiptFile: z
    .custom<FileList>()
    .refine((fileList) => fileList.length === 1, "Expected file")
    .transform((file) => file[0] as File)
    .refine((file) => {
      return file.size <= 1 * 1024 * 1024;
    }, `File size should be less than 1mb.`)

    // .refine(
    //   (file) => [".jpg", ".jpeg", "png"].includes(file.type),
    //   "Only these types are allowed .jpg, .jpeg, .png, .webp and mp4"
    // )
    .optional(),
});

type NewNotesFormType = z.infer<typeof NewNotesFormSchema>;

const defFormVal = {
  title: "",
  description: "",
  receiptFile: undefined,
};

type NewNotesFormProps = {
  onNoteCreate: () => void;
};

// NewNotesForm
export default function NewNotesForm({ onNoteCreate }: NewNotesFormProps) {
  const router = useRouter();

  // Define form.
  const form = useForm<NewNotesFormType>({
    resolver: zodResolver(NewNotesFormSchema),
    defaultValues: defFormVal,
  });

  // fileInputRef is patch used to reset the file input
  const fileInputRef = useRef<(() => void) | HTMLInputElement | null>(null);

  // applyZodError apply zod error to form
  const applyZodError = (form: any, err: z.ZodError): void => {
    const flatten = err.flatten();

    Object.keys(flatten.fieldErrors).forEach((key) => {
      form.setError(key as keyof NewNotesFormType, {
        type: "manual",
        message: flatten.fieldErrors[key]?.join(""),
      });
    });
  };

  // formReset reset form and file input
  const formReset = () => {
    if (fileInputRef.current) {
      if (fileInputRef.current instanceof HTMLInputElement) {
        fileInputRef.current.value = "";
      }
    }
    form.reset();
  };

  // onSubmit handles form control and post and handle data.
  const onSubmit = async (values: NewNotesFormType) => {
    try {
      form.control._disableForm(true);
      // TODO: proper error handling
      const nwNote: Note = {
        title: values.title,
        description: values.description,
        receiptFile: values.receiptFile,
      };

      const result: ApiResponse = await createNewNotesRequest(nwNote);
      console.log(result);

      if (result.success) {
        formReset();

        form.control._disableForm(false);
        // router.push("/");
        onNoteCreate();
        toast(result.message);
        // TODO: navigate to newly created note
      } else {
        form.control._disableForm(false);

        // convert api error to zod error
        const resErr = convApiRspToZodError(result.error);
        if (!resErr) {
          toast.error(result.message);
          return;
        }

        // apply zod error to form
        if (isZodError(resErr)) {
          applyZodError(form, resErr);
        }

        toast.error(result.message);
      }
    } catch (err) {
      form.control._disableForm(false);
      console.log(err);
    }
  };

  // 3. Render your form.
  const onReset = () => {
    form.control._disableForm(false);
    formReset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Title</FormLabel>
              <FormControl>
                <Input placeholder="your note title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your purchase..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* file upload */}
        <FormField
          control={form.control}
          name="receiptFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">receiptFile</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  onBlur={field.onBlur}
                  name={field.name}
                  disabled={field.disabled}
                  ref={(e) => {
                    field.ref(e);
                    fileInputRef.current = e;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset
          </Button>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
