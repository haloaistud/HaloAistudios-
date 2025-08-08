
"use client";

import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { handleSummarize } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CornerDownLeft, Bot, MessageSquareText, Loader } from "lucide-react";

interface Result {
  summary: string;
  reply: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <CornerDownLeft className="mr-2 h-4 w-4" />
          Generate Reply
        </>
      )}
    </Button>
  );
}

export function MotivaBot() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const action = async (formData: FormData) => {
    setResult(null);
    setError(null);
    const { data, error } = await handleSummarize(formData);
    if (error) {
      setError(error);
    } else if (data) {
      setResult(data);
      formRef.current?.reset();
    }
  };

  return (
    <div className="space-y-4">
      <form ref={formRef} action={action} className="space-y-4">
        <Textarea
          name="message"
          placeholder="Type your message here... MotivaBot will summarize it and suggest a reply."
          rows={4}
          required
          minLength={10}
          className="bg-background"
        />
        <SubmitButton />
      </form>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {result && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquareText className="h-5 w-5 text-primary" /> Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-primary" /> Suggested Reply
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.reply}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
