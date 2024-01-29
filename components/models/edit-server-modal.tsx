"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FileUpload } from "../file-upload";
import { useModal } from "@/hooks/use-model-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const serverSchema = z.object({
  name: z.string().min(1, { message: "Server name required." }),
  imageUrl: z.string().min(1, { message: "Server image required." }),
});
export const EditServerModal = () => {
  const router = useRouter();
  const { isOpen, onOpen, type, onClose, data } = useModal();
  const { server } = data;

  const isModelOpen = isOpen && type === "editServer";

  const form = useForm({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [server, form]);
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof serverSchema>) => {
    try {
      const res = await axios.patch(`/api/server/${server?.id}`, values);
      console.log(res.data);
      onOpen("editServer", { server: res.data });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and image,You can always
            change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8 ">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter server name"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                disabled={isLoading}
                variant="primary"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
