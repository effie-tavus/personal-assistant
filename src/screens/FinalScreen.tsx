import { DialogWrapper, AnimatedTextBlockWrapper } from "@/components/DialogWrapper";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";

export const FinalScreen: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);

  const handleReturn = () => {
    setScreenState({ currentScreen: "intro" });
  };

  // Feedback state
  const [rating, setRating] = useState<null | 'sad' | 'neutral' | 'happy'>(null);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = async () => {
    try {
      // Get username from settings
      const savedSettings = localStorage.getItem('tavus-settings');
      const username = savedSettings ? JSON.parse(savedSettings).name : 'anonymous';
      
      const feedbackData = {
        username,
        rating,
        text: text || ''
      };
      
      console.log('Submitting feedback:', feedbackData);
      
      // Check if Google Sheets URL is configured
      const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (!sheetsUrl) {
        console.warn('Google Sheets URL not configured, using local fallback');
        console.log("Feedback (local):", feedbackData);
        setSubmitted(true);
        return;
      }
      
      // Use form submission to avoid CORS issues
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = sheetsUrl;
      form.target = 'hidden-iframe';
      
      // Add data as hidden fields
      const fields = {
        username: feedbackData.username,
        rating: feedbackData.rating,
        text: feedbackData.text
      };
      
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      // Create hidden iframe to handle response
      let iframe = document.getElementById('hidden-iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      
      // Submit form
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      console.log("Feedback submitted via form (Google Sheets)");
      setSubmitted(true);
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Fallback to local logging
      const savedSettings = localStorage.getItem('tavus-settings');
      const username = savedSettings ? JSON.parse(savedSettings).name : 'anonymous';
      console.log("Feedback (local fallback):", { username, rating, text });
      setSubmitted(true);
    }
  };

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex flex-col items-center justify-center gap-6 py-12">
          <h1 className="text-3xl font-bold text-white mb-4 text-center">Thank you for your conversation!</h1>
          {/* Feedback Flow */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="text-white text-lg font-semibold mb-2">How was your experience?</div>
            <div className="flex gap-6 mb-2">
              <button
                aria-label="Sad"
                className={`text-4xl transition-transform ${rating === 'sad' ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setRating('sad')}
                disabled={submitted}
              >
                😞
              </button>
              <button
                aria-label="Neutral"
                className={`text-4xl transition-transform ${rating === 'neutral' ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setRating('neutral')}
                disabled={submitted}
              >
                😐
              </button>
              <button
                aria-label="Happy"
                className={`text-4xl transition-transform ${rating === 'happy' ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setRating('happy')}
                disabled={submitted}
              >
                😊
              </button>
            </div>
            <textarea
              className="w-full rounded-lg border border-white/20 bg-black/40 p-2 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Optional: Share more feedback..."
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={submitted}
              style={{ fontFamily: 'inherit' }}
            />
            <button
              onClick={handleFeedbackSubmit}
              disabled={submitted || !rating}
              className="mt-1 px-6 py-2 rounded-2xl bg-primary text-white font-bold text-sm disabled:opacity-50 border border-white/20 hover:bg-primary/80 transition-all"
              style={{ fontFamily: 'inherit' }}
            >
              {submitted ? 'Thank you for your feedback!' : 'Submit Feedback'}
            </button>
          </div>
          <Button
            onClick={handleReturn}
            className="relative z-20 flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] px-8 py-3 text-base text-white transition-all duration-200 hover:text-primary disabled:opacity-50"
            style={{
              height: '48px',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(34, 197, 254, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Return to Main Screen
          </Button>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
