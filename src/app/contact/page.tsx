
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Send, Twitter, Github, Linkedin, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Get in Touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We’d love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action="#" className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Mail className="text-primary"/> Direct Email</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        For direct inquiries, you can email us at:
                    </p>
                    <a href="mailto:contact@haloAistudios.com" className="text-accent hover:underline break-all">
                        contact@haloAistudios.com
                    </a>
                </CardContent>
            </Card>

            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center gap-6">
                        <a href="https://facebook.com/angelAistudios" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-8 w-8" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-8 w-8" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-8 w-8" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-8 w-8" /></a>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
