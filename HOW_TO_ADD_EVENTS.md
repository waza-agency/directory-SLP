# How to Add Cultural Events to the Database

## Quick Start Guide

### Step 1: Prepare Your Events

1. Open `EVENTS_TEMPLATE.json`
2. Look at the examples in `"example_events"` to understand the format
3. Add your events to the `"events_to_add"` array at the bottom of the file

### Step 2: Fill Out Event Information

For each event, you need to provide:

```json
{
  "title": "Event Name Here",
  "description": "Detailed description or null if you don't have one",
  "start_date": "2025-04-12T10:00:00",
  "end_date": "2025-04-19T22:00:00",
  "location": "Venue name and address",
  "category": "cultural",
  "image_url": null,
  "featured": true,
  "show_in_cultural_calendar": true,
  "place_id": null
}
```

### Step 3: Important Format Rules

#### Dates
- Format: `YYYY-MM-DDTHH:MM:SS`
- Example: `2025-04-12T10:00:00`
- For single-day events, use the same date for both start and end
- If you don't know the exact time, use `00:00:00`

#### Category
Must be ONE of these:
- `"cultural"` - General cultural events, traditions
- `"arts-culture"` - Art exhibitions, museum events
- `"music"` - Concerts, music festivals
- `"sports"` - Sports events, marathons
- `"culinary"` - Food festivals, gastronomic events
- `"other"` - Anything else

#### Booleans (true/false)
- `featured`: Set to `true` for important events
- `show_in_cultural_calendar`: Set to `true` to display on homepage cultural calendar
- **DO NOT use quotes** - write `true` not `"true"`

#### Optional Fields
- `description`: Can be `null` if you don't have one yet
- `image_url`: Can be `null` if no image yet
- `place_id`: Leave as `null` (for linking to places table later)

### Step 4: Example Event Entry

Here's a complete example:

```json
{
  "events_to_add": [
    {
      "title": "Festival Internacional San Luis en Primavera",
      "description": "Major spring festival with concerts and art exhibitions featuring international artists.",
      "start_date": "2025-04-12T10:00:00",
      "end_date": "2025-04-19T22:00:00",
      "location": "Plaza de Los Fundadores, Centro Histórico",
      "category": "cultural",
      "image_url": null,
      "featured": true,
      "show_in_cultural_calendar": true,
      "place_id": null
    },
    {
      "title": "Kuitólil Festival 2025",
      "description": "Performing arts festival for children and youth",
      "start_date": "2025-11-24T10:00:00",
      "end_date": "2025-12-01T20:00:00",
      "location": "Teatro de la Paz",
      "category": "arts-culture",
      "image_url": null,
      "featured": true,
      "show_in_cultural_calendar": true,
      "place_id": null
    }
  ]
}
```

### Step 5: Run the Import Script

Once you've filled out your events:

```bash
node scripts/add-events-from-template.js
```

The script will:
1. ✅ Validate all your events
2. ✅ Check for required fields
3. ✅ Verify date formats
4. ✅ Confirm categories are valid
5. ✅ Add events to the database
6. ✅ Show you the results

### Step 6: Rebuild the Site

After adding events, rebuild the site to see them:

```bash
npm run build
```

Or run the dev server:

```bash
npm run dev
```

---

## Common Mistakes to Avoid

### ❌ Wrong Date Format
```json
"start_date": "04/12/2025"  // WRONG
"start_date": "2025-04-12"  // WRONG - missing time
```

### ✅ Correct Date Format
```json
"start_date": "2025-04-12T10:00:00"  // CORRECT
```

### ❌ Wrong Boolean Format
```json
"featured": "true"  // WRONG - has quotes
```

### ✅ Correct Boolean Format
```json
"featured": true  // CORRECT - no quotes
```

### ❌ Invalid Category
```json
"category": "festival"  // WRONG - not a valid category
```

### ✅ Valid Category
```json
"category": "cultural"  // CORRECT
```

---

## Checklist Before Running Script

- [ ] All dates are in format `YYYY-MM-DDTHH:MM:SS`
- [ ] All categories are valid (`cultural`, `arts-culture`, `music`, `sports`, `culinary`, `other`)
- [ ] `featured` and `show_in_cultural_calendar` are boolean (`true` or `false`) without quotes
- [ ] Required fields are filled: `title`, `start_date`, `end_date`, `location`, `category`
- [ ] Events are in the `"events_to_add"` array

---

## Need Help?

- Check `EVENTS_TEMPLATE.json` for examples
- Look at `CULTURAL_EVENTS_RESEARCH_2025.md` for event ideas
- The script will tell you exactly what's wrong if validation fails

---

## After Adding Events

Your events will automatically:
- ✅ Appear in the `/events` page
- ✅ Show in the cultural calendar (if `show_in_cultural_calendar: true`)
- ✅ Be filterable by category
- ✅ Display on the homepage (if `featured: true`)
