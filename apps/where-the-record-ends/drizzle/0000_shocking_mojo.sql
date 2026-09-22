CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(120) NOT NULL,
	"email" varchar(254) NOT NULL,
	"topic" varchar(160),
	"message" text NOT NULL,
	"source_url" varchar(2048),
	"referring_page" varchar(255),
	"status" varchar(32) DEFAULT 'new' NOT NULL,
	"spam_status" varchar(32) DEFAULT 'accepted' NOT NULL,
	"notification_status" varchar(32) DEFAULT 'pending' NOT NULL,
	"notification_attempted_at" timestamp with time zone,
	"notification_sent_at" timestamp with time zone
);
