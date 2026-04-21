-- Track the Beehiiv subscription ID so we can resync without depending on email
-- (emails can change, Beehiiv IDs are stable). Added when we backfilled 908
-- subscribers from Beehiiv on 2026-04-21 after being locked out of the Gmail
-- owner account.

ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS beehiiv_subscription_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_subscribers_beehiiv_id
  ON newsletter_subscribers(beehiiv_subscription_id)
  WHERE beehiiv_subscription_id IS NOT NULL;
