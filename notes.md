TODO:

- **add 'verify account' page**. A simple page in the front-end app that queries the `verify` route in the server and shows either 'succes' or 'error' message. If success, a 'login' button should appear, if 'error' then a 'resend email' button should appear.
- **add 'delete account' option**. User should be able to delete their account. This should be a button on the 'account' page. User must type their username to 'activate' the button and should get a browser 'confirm' prompt before operation is completed.
- **add 'notifications' toggle.** User should be able to 'turn off' notification emails. This should be a toggle on the account page. When off, none of the emails should be sent by the server. Obviously this won't/shouldn't affect the 'welcome' or 'verification' emails.
- **add 'activity log'.** Account should include a log of recent (roughly 100?) user actions. Things like profile updated, password changed, project deleted etc. This could be shown in a sidebar on desktop, and a drawer on mobile.

---

API V2 PLAN:

- namespace the current `api.router` as `v1-api.router`.
- create new `api.router` file.
  - new endpoints to get, update, delete MPs.
  - should include operations like getting MP but *only* contact info, for example.
- create script to populate the DB - this should only need to be run once, the dataset can then be maintained manually.

---

ROADMAP:

- Add MP expenses data.
- Add MP voting data.
- Add Lords data.
- Add Party data.