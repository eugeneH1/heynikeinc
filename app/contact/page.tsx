'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextRevealCardPreview } from "../components/TextRevealForm";
import { TextGenerateEffectDemo } from "../components/TextGenerateEffect";

export default function Contact() {

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    phone: z.string().min(10, { message: "Phone number or email address is required." }),
    email: z.string().email({ message: "Phone number or email address is required." }),
    treatment: z.string(),
    myself: z.boolean(),
    message: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      treatment: 'Did not specify',
      myself: false,
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // event.preventDefault();

    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      // body: JSON.stringify({ name, phone, email, treatment, myself, message }),
    });

    if (response.ok) {
      console.log('Form submitted');
      toast("Your enquiry has been submitted. ", {
        description: "We will be in touch shortly."
      })
      form.reset();
      // handle success
    } else {
      toast("There was an error submitting your enquiry. ", {
        description: "Please try again later.",
      }
      )
      console.log('Submission error');
      // console.log(response);
      // handle error
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start justify-center space-y-4 lg:space-y-0 lg:space-x-4 py-4">
      <TextGenerateEffectDemo />
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-center space-y-4 lg:space-y-0 lg:space-x-4 py-4">
        <Card className="w-full lg:w-1/3 max-w-md">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p><strong>Address:</strong> 123 Main St, City, State, ZIP</p>
              <p><strong>Phone:</strong> (123) 456-7890</p>
              <p><strong>Email:</strong> law@heynikeinc.co.za</p>
              <p><strong>Hours:</strong> Monday-Friday, 9am-5pm</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-2/3 max-w-2xl">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        Please enter your name or the person you are enquiring for.
                      </FormDescription> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        Please enter a phone number. 
                      </FormDescription> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="Email address" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        Please enter an email address. 
                      </FormDescription> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="treatment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you enquiring about?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General Mercentile Law">General Mercentile Law</SelectItem>
                          <SelectItem value="Company Law and Contracts">Company Law and Contracts</SelectItem>
                          <SelectItem value="Conveyancing">Conveyancing</SelectItem>
                          <SelectItem value="Drafting of sale agreements">Drafting of sale agreements</SelectItem>
                          <SelectItem value="Transfers, Bonds and related matters">Transfers, Bonds and related matters</SelectItem>
                          <SelectItem value="Anti Nuptual Contracts">Anti Nuptual Contracts</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Input placeholder="Any specifics you wish to add" {...field} />
                      </FormControl>
                      <FormDescription>
                        Any additional information you wish to specify
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Button type-="submit">Submit</Button> */}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}