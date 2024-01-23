"use client";

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

const NewNotesFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "description must be at least 3 characters.",
  }),
  receipt: z
    .custom<FileList>()
    .refine((fileList) => fileList.length === 1, "Expected file")
    .transform((file) => file[0] as File)
    .refine((file) => {
      return file.size <= 1 * 1024 * 1024;
    }, `File size should be less than 1gb.`)
    // .refine(
    //   (file) => [".jpg", ".jpeg", "png"].includes(file.type),
    //   "Only these types are allowed .jpg, .jpeg, .png, .webp and mp4"
    // )
    .optional(),
});

type NewNotesFormType = z.infer<typeof NewNotesFormSchema>;

const createNewNotes = async (values: any) => {
  // axios to post request to path /api/web/tools/montra/account
  // TODO: add proper error handling
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("receipt", values.receipt);
    const res = await fetch("/api/note", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const defFormVal = {
  title: "",
  description: "",
  receipt: undefined,
};

// NewNotesForm
export default function NewNotesForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<NewNotesFormType>({
    resolver: zodResolver(NewNotesFormSchema),
    defaultValues: defFormVal,
  });

  // 2. Submit your form.
  const onSubmit = async (values: NewNotesFormType) => {
    console.log(values);
    form.control._disableForm(true);
    // TODO: prepare the transaction object

    console.log(values.receipt);

    await createNewNotes(values);

    // TODO: send the response to the server
    toast("Notes has been created.");
    form.reset(defFormVal);

    form.control._disableForm(false);

    // router.push("/tools/expense-tracker");
  };

  // 3. Render your form.
  const onReset = () => {
    form.control._disableForm(false);
    form.reset();
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
          name="receipt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Receipt</FormLabel>
              <FormControl>
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  onBlur={field.onBlur}
                  name={field.name}
                  disabled={field.disabled}
                  ref={field.ref}
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
