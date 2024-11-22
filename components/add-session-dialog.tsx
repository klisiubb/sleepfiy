"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DateTimePicker24hForm } from "./misc/date-time-picker";
import SleepRateSlider from "./misc/sleep-rate-slider";
import SleepNoteTextarea from "./misc/note-textarea";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { sleepFormSchema } from "@/schemas/sleep";
import { CreateSleepSession } from "@/actions/sleep/create";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const AddSessionDialog = () => {
  const { user } = useKindeBrowserClient();

  const form = useForm<z.infer<typeof sleepFormSchema>>({
    resolver: zodResolver(sleepFormSchema),
    defaultValues: {
      wentToBedAt: new Date(),
      wokeUpAt: new Date(),
      sleepRate: 3,
      note: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof sleepFormSchema>) {
    const data = await CreateSleepSession({
      ...values,
      userId: user!!.id,
      note: values.note ?? null,
    });
    if (data.status === 400) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      form.reset();
      router.push(`/dashboard`);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Add new sleep session</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AlertDialogHeader>
              <AlertDialogTitle>Add new sleep session</AlertDialogTitle>
              <AlertDialogDescription>
                Fill in the details of your sleep session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name="wentToBedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Went to bed at:</FormLabel>
                  <FormControl>
                    <DateTimePicker24hForm
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wokeUpAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wake up at:</FormLabel>
                  <FormControl>
                    <DateTimePicker24hForm
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sleepRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sleep quality:</FormLabel>
                  <FormControl>
                    <SleepRateSlider
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional note:</FormLabel>
                  <FormControl>
                    <SleepNoteTextarea
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Submit</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddSessionDialog;
