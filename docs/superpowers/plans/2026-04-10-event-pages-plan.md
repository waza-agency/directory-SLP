# Event Pages & Carousel Banner — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 3 SEO/GEO/AEO-optimized event landing pages (Maratón Tangamanga, San Luis Metal Fest, FENAPO 2026) and a homepage carousel banner to drive organic traffic.

**Architecture:** Static dedicated `.tsx` pages per event (following existing `fenapo-2025.tsx` pattern), each with i18n via `next-i18next` in 4 locales (en/es/de/ja), typed Schema.org markup, and FAQPage schema. A new `EventCarouselBanner` component replaces `FestivalPrimaveraBanner` on the homepage.

**Tech Stack:** Next.js (static pages via `getStaticProps`), next-i18next, Tailwind CSS, Schema.org JSON-LD, Heroicons

**Spec:** `docs/superpowers/specs/2026-04-10-event-pages-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/EventCarouselBanner.tsx` | Create | Rotating 3-event banner for homepage |
| `src/pages/events/san-luis-metal-fest-2026.tsx` | Create | Metal Fest event page |
| `src/pages/events/maraton-tangamanga-2026.tsx` | Create | Maratón Tangamanga event page |
| `src/pages/events/fenapo-2026.tsx` | Create | FENAPO 2026 event page (replaces 2025) |
| `src/pages/index.tsx` | Modify | Replace FestivalPrimaveraBanner with EventCarouselBanner |
| `public/locales/es/common.json` | Modify | Add ~600 translation keys |
| `public/locales/en/common.json` | Modify | Add ~600 translation keys |
| `public/locales/de/common.json` | Modify | Add ~600 translation keys |
| `public/locales/ja/common.json` | Modify | Add ~600 translation keys |

## Task Dependencies

```
Task 1 (Carousel Banner) ──┐
Task 2 (Metal Fest)     ───┤── all independent, can run in parallel
Task 3 (Maratón)        ───┤
Task 4 (FENAPO)         ───┘
                            │
Task 5 (Homepage integration) ── depends on Task 1
Task 6 (Build verification)  ── depends on all
```

---

### Task 1: EventCarouselBanner Component + Translations

**Files:**
- Create: `src/components/EventCarouselBanner.tsx`
- Modify: `public/locales/es/common.json`
- Modify: `public/locales/en/common.json`
- Modify: `public/locales/de/common.json`
- Modify: `public/locales/ja/common.json`

- [ ] **Step 1: Add carousel translation keys to ES locale**

In `public/locales/es/common.json`, add this block after the `"festivalBanner"` section (around line 891, before `"festival"`):

```json
"eventCarousel": {
  "metalFest": {
    "badge": "16 — 17 May 2026",
    "title": "San Luis Metal Fest",
    "description": "1ra edición. Entrada GRATUITA. Marduk, Possessed, Metal Church y más en el recinto FENAPO.",
    "cta": "Ver cartel completo",
    "stat1Value": "2",
    "stat1Label": "Días",
    "stat2Value": "30K+",
    "stat2Label": "Asistentes",
    "stat3Value": "Gratis",
    "stat3Label": "Entrada",
    "stat4Value": "8+",
    "stat4Label": "Países"
  },
  "maraton": {
    "badge": "28 Jun 2026",
    "title": "Maratón Tangamanga",
    "description": "40 Aniversario. 5K, 10K, 21K y 42K por el Parque Tangamanga y Centro Histórico de SLP.",
    "cta": "Info e inscripción",
    "stat1Value": "40°",
    "stat1Label": "Edición",
    "stat2Value": "15K+",
    "stat2Label": "Corredores",
    "stat3Value": "4",
    "stat3Label": "Distancias",
    "stat4Value": "FMAA",
    "stat4Label": "Certificado"
  },
  "fenapo": {
    "badge": "Agosto 2026",
    "title": "FENAPO 2026",
    "description": "La feria más tradicional de México regresa. Grupo Firme, Sin Bandera, Los Acosta y más artistas por confirmar.",
    "cta": "Ver artistas confirmados",
    "stat1Value": "24",
    "stat1Label": "Días",
    "stat2Value": "3+",
    "stat2Label": "Artistas",
    "stat3Value": "Gratis",
    "stat3Label": "Entrada Gral.",
    "stat4Value": "6",
    "stat4Label": "Zonas"
  }
}
```

- [ ] **Step 2: Add carousel translation keys to EN locale**

In `public/locales/en/common.json`, add after the `"festivalBanner"` section:

```json
"eventCarousel": {
  "metalFest": {
    "badge": "May 16 — 17, 2026",
    "title": "San Luis Metal Fest",
    "description": "1st edition. FREE ENTRY. Marduk, Possessed, Metal Church and more at FENAPO grounds.",
    "cta": "See full lineup",
    "stat1Value": "2",
    "stat1Label": "Days",
    "stat2Value": "30K+",
    "stat2Label": "Attendees",
    "stat3Value": "Free",
    "stat3Label": "Entry",
    "stat4Value": "8+",
    "stat4Label": "Countries"
  },
  "maraton": {
    "badge": "Jun 28, 2026",
    "title": "Tangamanga Marathon",
    "description": "40th Anniversary. 5K, 10K, 21K & 42K through Tangamanga Park and SLP Historic Center.",
    "cta": "Info & registration",
    "stat1Value": "40th",
    "stat1Label": "Edition",
    "stat2Value": "15K+",
    "stat2Label": "Runners",
    "stat3Value": "4",
    "stat3Label": "Distances",
    "stat4Value": "FMAA",
    "stat4Label": "Certified"
  },
  "fenapo": {
    "badge": "August 2026",
    "title": "FENAPO 2026",
    "description": "Mexico's most traditional fair returns. Grupo Firme, Sin Bandera, Los Acosta and more artists TBA.",
    "cta": "See confirmed artists",
    "stat1Value": "24",
    "stat1Label": "Days",
    "stat2Value": "3+",
    "stat2Label": "Artists",
    "stat3Value": "Free",
    "stat3Label": "Gen. Entry",
    "stat4Value": "6",
    "stat4Label": "Zones"
  }
}
```

- [ ] **Step 3: Add carousel translation keys to DE locale**

In `public/locales/de/common.json`, add after the `"festivalBanner"` section:

```json
"eventCarousel": {
  "metalFest": {
    "badge": "16. — 17. Mai 2026",
    "title": "San Luis Metal Fest",
    "description": "1. Ausgabe. KOSTENLOSER EINTRITT. Marduk, Possessed, Metal Church und mehr auf dem FENAPO-Gelände.",
    "cta": "Komplettes Line-up",
    "stat1Value": "2",
    "stat1Label": "Tage",
    "stat2Value": "30K+",
    "stat2Label": "Besucher",
    "stat3Value": "Gratis",
    "stat3Label": "Eintritt",
    "stat4Value": "8+",
    "stat4Label": "Länder"
  },
  "maraton": {
    "badge": "28. Juni 2026",
    "title": "Tangamanga-Marathon",
    "description": "40. Jubiläum. 5K, 10K, 21K & 42K durch den Tangamanga-Park und die Altstadt von SLP.",
    "cta": "Info & Anmeldung",
    "stat1Value": "40.",
    "stat1Label": "Ausgabe",
    "stat2Value": "15K+",
    "stat2Label": "Läufer",
    "stat3Value": "4",
    "stat3Label": "Distanzen",
    "stat4Value": "FMAA",
    "stat4Label": "Zertifiziert"
  },
  "fenapo": {
    "badge": "August 2026",
    "title": "FENAPO 2026",
    "description": "Mexikos traditionsreichste Messe kehrt zurück. Grupo Firme, Sin Bandera, Los Acosta und weitere Künstler folgen.",
    "cta": "Bestätigte Künstler",
    "stat1Value": "24",
    "stat1Label": "Tage",
    "stat2Value": "3+",
    "stat2Label": "Künstler",
    "stat3Value": "Gratis",
    "stat3Label": "Allg. Eintritt",
    "stat4Value": "6",
    "stat4Label": "Bereiche"
  }
}
```

- [ ] **Step 4: Add carousel translation keys to JA locale**

In `public/locales/ja/common.json`, add after the `"festivalBanner"` section:

```json
"eventCarousel": {
  "metalFest": {
    "badge": "2026年5月16日〜17日",
    "title": "サンルイス・メタルフェスト",
    "description": "第1回開催。入場無料。Marduk、Possessed、Metal ChurchなどがFENAPO会場に集結。",
    "cta": "ラインナップを見る",
    "stat1Value": "2",
    "stat1Label": "日間",
    "stat2Value": "3万+",
    "stat2Label": "来場者",
    "stat3Value": "無料",
    "stat3Label": "入場",
    "stat4Value": "8+",
    "stat4Label": "カ国"
  },
  "maraton": {
    "badge": "2026年6月28日",
    "title": "タンガマンガ・マラソン",
    "description": "40周年記念大会。タンガマンガ公園とSLP歴史地区を走る5K、10K、21K、42K。",
    "cta": "情報・参加登録",
    "stat1Value": "40",
    "stat1Label": "回目",
    "stat2Value": "1.5万+",
    "stat2Label": "ランナー",
    "stat3Value": "4",
    "stat3Label": "距離",
    "stat4Value": "FMAA",
    "stat4Label": "公認"
  },
  "fenapo": {
    "badge": "2026年8月",
    "title": "FENAPO 2026",
    "description": "メキシコで最も伝統的な祭典が復活。Grupo Firme、Sin Bandera、Los Acostaほか出演者続々発表。",
    "cta": "出演者を見る",
    "stat1Value": "24",
    "stat1Label": "日間",
    "stat2Value": "3+",
    "stat2Label": "アーティスト",
    "stat3Value": "無料",
    "stat3Label": "一般入場",
    "stat4Value": "6",
    "stat4Label": "エリア"
  }
}
```

- [ ] **Step 5: Create EventCarouselBanner component**

Create `src/components/EventCarouselBanner.tsx`:

```tsx
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface EventSlide {
  key: string;
  href: string;
  gradient: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  badgeDot: string;
  ctaGradient: string;
  ctaHover: string;
  ctaShadow: string;
}

const slides: EventSlide[] = [
  {
    key: 'metalFest',
    href: '/events/san-luis-metal-fest-2026',
    gradient: 'from-[#1a0a0a] via-[#3d0c0c] to-[#2a0a2e]',
    accentColor: 'text-red-400',
    badgeBg: 'bg-red-500/20 border-red-500/30',
    badgeText: 'text-red-300',
    badgeDot: 'bg-red-500',
    ctaGradient: 'from-red-500 to-red-600',
    ctaHover: 'hover:from-red-400 hover:to-red-500',
    ctaShadow: 'shadow-red-500/25',
  },
  {
    key: 'maraton',
    href: '/events/maraton-tangamanga-2026',
    gradient: 'from-[#0a2e1a] via-[#0c3d2a] to-[#0a1e3e]',
    accentColor: 'text-amber-400',
    badgeBg: 'bg-amber-400/20 border-amber-400/30',
    badgeText: 'text-amber-300',
    badgeDot: 'bg-amber-400',
    ctaGradient: 'from-amber-400 to-amber-500',
    ctaHover: 'hover:from-amber-300 hover:to-amber-400',
    ctaShadow: 'shadow-amber-500/25',
  },
  {
    key: 'fenapo',
    href: '/events/fenapo-2026',
    gradient: 'from-[#0a0a3e] via-[#1a1478] to-[#2e0a4e]',
    accentColor: 'text-purple-300',
    badgeBg: 'bg-purple-400/20 border-purple-400/30',
    badgeText: 'text-purple-300',
    badgeDot: 'bg-purple-400',
    ctaGradient: 'from-purple-400 to-purple-500',
    ctaHover: 'hover:from-purple-300 hover:to-purple-400',
    ctaShadow: 'shadow-purple-500/25',
  },
];

const EventCarouselBanner = () => {
  const { t } = useTranslation('common');
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = slides[current];
  const ns = `eventCarousel.${slide.key}`;

  const stats = [
    { value: t(`${ns}.stat1Value`), label: t(`${ns}.stat1Label`) },
    { value: t(`${ns}.stat2Value`), label: t(`${ns}.stat2Label`) },
    { value: t(`${ns}.stat3Value`), label: t(`${ns}.stat3Label`) },
    { value: t(`${ns}.stat4Value`), label: t(`${ns}.stat4Label`) },
  ];

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-700`} />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(1px 1px at 130px 80px, white, transparent), radial-gradient(2px 2px at 160px 30px, white, transparent)',
          backgroundSize: '200px 100px',
        }}
      />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 ${slide.badgeBg} border rounded-full px-4 py-1.5 mb-4`}>
            <span className={`w-2 h-2 rounded-full ${slide.badgeDot} animate-pulse`} />
            <span className={`${slide.badgeText} text-xs font-bold uppercase tracking-widest`}>
              {t(`${ns}.badge`)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 leading-tight">
            {t(`${ns}.title`)}
          </h3>

          {/* Description */}
          <p className="text-white/80 text-sm md:text-base max-w-2xl mb-5 leading-relaxed">
            {t(`${ns}.description`)}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/60 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={slide.href}
            className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.ctaGradient} text-white px-8 py-3.5 rounded-full font-bold text-base ${slide.ctaHover} transition-all duration-300 hover:scale-105 shadow-lg ${slide.ctaShadow}`}
          >
            {t(`${ns}.cta`)}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Dots */}
        <div className="flex justify-center lg:justify-start gap-2 mt-8">
          {slides.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setCurrent(i)}
              aria-label={`Go to ${s.key}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCarouselBanner;
```

- [ ] **Step 6: Verify file created**

Run: `ls src/components/EventCarouselBanner.tsx`
Expected: file exists

- [ ] **Step 7: Commit**

```bash
git add src/components/EventCarouselBanner.tsx public/locales/*/common.json
git commit -m "feat: add EventCarouselBanner component + i18n keys for 3 events"
```

---

### Task 2: San Luis Metal Fest 2026 Page + Translations

**Files:**
- Create: `src/pages/events/san-luis-metal-fest-2026.tsx`
- Modify: `public/locales/es/common.json`
- Modify: `public/locales/en/common.json`
- Modify: `public/locales/de/common.json`
- Modify: `public/locales/ja/common.json`

- [ ] **Step 1: Add Metal Fest translation keys to all 4 locales**

Add to `public/locales/es/common.json` (after the `eventCarousel` block):

```json
"metalFest2026": {
  "seo": {
    "title": "San Luis Metal Fest 2026 — Festival de Metal Gratuito en San Luis Potosí",
    "description": "San Luis Metal Fest 2026: 16-17 de mayo. Entrada GRATUITA. Marduk, Possessed, Metal Church, Grave, Armored Saint y más. Primer festival internacional de metal en SLP. Cartel, horarios y guía del asistente.",
    "keywords": "san luis metal fest 2026, festival metal san luis potosi, metal fest slp, conciertos metal mexico, marduk mexico 2026, possessed mexico 2026"
  },
  "hero": {
    "badge": "1RA EDICIÓN — ENTRADA GRATUITA",
    "date": "16 — 17 de Mayo, 2026",
    "title": "San Luis Metal Fest",
    "subtitle": "El Despertar de la Oscuridad",
    "description": "El primer festival internacional de metal en San Luis Potosí. Dos días de bandas legendarias de 8 países, gastronomía, cultura Huasteca y la mejor comunidad metalera de México.",
    "cta": "Regístrate gratis",
    "ctaLineup": "Ver cartel"
  },
  "stats": {
    "days": "Días",
    "daysValue": "2",
    "bands": "Bandas",
    "bandsValue": "15+",
    "attendees": "Asistentes esperados",
    "attendeesValue": "30,000+",
    "countries": "Países",
    "countriesValue": "8+",
    "price": "Entrada",
    "priceValue": "Gratis"
  },
  "lineup": {
    "title": "Cartel Oficial",
    "subtitle": "Bandas legendarias de thrash, death, black y heavy metal de todo el mundo.",
    "day1": "Día 1 — Sábado 16 de Mayo",
    "day2": "Día 2 — Domingo 17 de Mayo",
    "headliners": "Headliners",
    "scheduleTbc": "Horarios por confirmar",
    "bands": {
      "marduk": { "name": "Marduk", "genre": "Black Metal", "country": "Suecia" },
      "metalChurch": { "name": "Metal Church", "genre": "Heavy / Power Metal", "country": "EE.UU." },
      "possessed": { "name": "Possessed", "genre": "Death Metal", "country": "EE.UU." },
      "grave": { "name": "Grave", "genre": "Death Metal", "country": "Suecia" },
      "armoredSaint": { "name": "Armored Saint", "genre": "Heavy Metal", "country": "EE.UU." },
      "crimsonGlory": { "name": "Crimson Glory", "genre": "Progressive Metal", "country": "EE.UU." },
      "pestilence": { "name": "Pestilence", "genre": "Death Metal", "country": "Países Bajos" },
      "sacrifice": { "name": "Sacrifice", "genre": "Thrash Metal", "country": "Canadá" },
      "hirax": { "name": "Hirax", "genre": "Thrash Metal", "country": "EE.UU." },
      "hellripper": { "name": "Hellripper", "genre": "Speed / Black Metal", "country": "Escocia" },
      "bloodFeast": { "name": "Blood Feast", "genre": "Thrash Metal", "country": "EE.UU." }
    }
  },
  "registration": {
    "title": "Cómo Registrarse",
    "subtitle": "La entrada es gratuita pero requiere registro previo.",
    "step1Title": "Visita el sitio oficial",
    "step1Desc": "Accede a la página de registro del San Luis Metal Fest.",
    "step2Title": "Completa tu registro",
    "step2Desc": "Proporciona tu nombre, correo electrónico e identificación oficial.",
    "step3Title": "Recibe tu confirmación",
    "step3Desc": "Recibirás un correo con tu código de acceso y las instrucciones del evento.",
    "note": "Se requiere identificación oficial vigente para el acceso."
  },
  "attendeeGuide": {
    "title": "Guía del Asistente",
    "subtitle": "Todo lo que necesitas saber para disfrutar el festival.",
    "bringTitle": "Qué llevar",
    "bringItems": "Protector solar, tapones para oídos, agua reutilizable, efectivo y tarjetas, ropa y calzado cómodo, identificación oficial",
    "prohibitedTitle": "Objetos prohibidos",
    "prohibitedItems": "Armas y objetos punzocortantes, botellas de vidrio, drogas ilegales, mascotas, drones, sillas plegables",
    "tipsTitle": "Tips para el Pit",
    "tipsDesc": "Si alguien se cae, levántalo. Respeta los límites de los demás. Mantente hidratado entre sets. Las áreas laterales son ideales si prefieres ver sin contacto."
  },
  "culture": {
    "title": "Más que Metal: Gastronomía y Cultura",
    "subtitle": "El festival incluye experiencias únicas que celebran la riqueza de San Luis Potosí.",
    "gastroTitle": "Pabellón Gastronómico",
    "gastroDesc": "Prueba enchiladas potosinas, tacos huastecos, zacahuil y más delicias regionales. Food trucks y bebidas artesanales.",
    "huastecaTitle": "Pabellón de Cultura Huasteca",
    "huastecaDesc": "Exposición de arte huasteco, danzas tradicionales, artesanías y música de huapango. Una ventana a la herencia cultural del estado."
  },
  "gettingThere": {
    "title": "Cómo Llegar",
    "venue": "Teatro del Pueblo — Recinto FENAPO",
    "address": "Av. Fco. Martínez de la Vega No. 255, San Luis Potosí",
    "byCarTitle": "En auto",
    "byCarDesc": "Estacionamiento amplio disponible en el recinto. Desde el centro, toma Av. Salvador Nava hacia el sur (~15 min).",
    "byTransitTitle": "Transporte público",
    "byTransitDesc": "Rutas de camión que pasan por el recinto FENAPO: 10, 12, 17. Taxis y Uber disponibles.",
    "byPlaneTitle": "Desde el aeropuerto",
    "byPlaneDesc": "El Aeropuerto de SLP (BJX) está a 20 minutos en auto. Taxis disponibles en la terminal.",
    "hotelsTitle": "Hospedaje cercano",
    "hotelsDesc": "Hoteles en la zona de Av. Carranza y Centro Histórico (10-15 min del recinto). Reserva con anticipación."
  },
  "faq": {
    "title": "Preguntas Frecuentes",
    "q1": "¿El San Luis Metal Fest es realmente gratis?",
    "a1": "Sí. La entrada es completamente gratuita, pero se requiere registro previo en línea. Recibirás un código de acceso por correo electrónico.",
    "q2": "¿Pueden entrar menores de edad?",
    "a2": "Sí, menores de edad pueden asistir acompañados de un adulto responsable con identificación oficial. Se recomienda protección auditiva para niños.",
    "q3": "¿Puedo llevar mi propia agua?",
    "a3": "Sí, se permite llevar botellas de agua reutilizables (no vidrio). También habrá estaciones de hidratación gratuitas dentro del recinto.",
    "q4": "¿Hay reingreso?",
    "a4": "Sí, se permite el reingreso mostrando tu pulsera de acceso. No pierdas tu pulsera.",
    "q5": "¿Hay cajeros automáticos en el recinto?",
    "a5": "Sí, hay cajeros dentro del recinto FENAPO. Sin embargo, se recomienda traer efectivo ya que algunos puestos de comida no aceptan tarjeta.",
    "q6": "¿Puedo llevar cámara fotográfica?",
    "a6": "Cámaras compactas y teléfonos están permitidos. Cámaras profesionales con lente desmontable requieren acreditación de prensa.",
    "q7": "¿El recinto es accesible para personas con discapacidad?",
    "a7": "Sí, el Recinto FENAPO cuenta con rampas de acceso y áreas designadas para personas con discapacidad.",
    "q8": "¿A qué hora debo llegar?",
    "a8": "Las puertas abren a las 12:00 PM. Se recomienda llegar temprano para evitar filas y asegurar buen lugar frente al escenario."
  },
  "cta": {
    "title": "No te pierdas el San Luis Metal Fest 2026",
    "description": "El primer festival internacional de metal en San Luis Potosí. Dos días de música extrema, gastronomía y cultura. Entrada gratuita.",
    "register": "Regístrate gratis",
    "moreEvents": "Ver más eventos en SLP"
  }
}
```

Add to `public/locales/en/common.json`:

```json
"metalFest2026": {
  "seo": {
    "title": "San Luis Metal Fest 2026 — Free Metal Festival in San Luis Potosí",
    "description": "San Luis Metal Fest 2026: May 16-17. FREE ENTRY. Marduk, Possessed, Metal Church, Grave, Armored Saint and more. First international metal festival in SLP. Lineup, schedule and attendee guide.",
    "keywords": "san luis metal fest 2026, metal festival san luis potosi, metal fest slp, metal concerts mexico, marduk mexico 2026, possessed mexico 2026"
  },
  "hero": {
    "badge": "1ST EDITION — FREE ENTRY",
    "date": "May 16 — 17, 2026",
    "title": "San Luis Metal Fest",
    "subtitle": "The Awakening of Darkness",
    "description": "The first international metal festival in San Luis Potosí. Two days of legendary bands from 8 countries, gastronomy, Huasteca culture and Mexico's best metal community.",
    "cta": "Register for free",
    "ctaLineup": "See lineup"
  },
  "stats": {
    "days": "Days",
    "daysValue": "2",
    "bands": "Bands",
    "bandsValue": "15+",
    "attendees": "Expected attendees",
    "attendeesValue": "30,000+",
    "countries": "Countries",
    "countriesValue": "8+",
    "price": "Entry",
    "priceValue": "Free"
  },
  "lineup": {
    "title": "Official Lineup",
    "subtitle": "Legendary bands from thrash, death, black and heavy metal around the world.",
    "day1": "Day 1 — Saturday, May 16",
    "day2": "Day 2 — Sunday, May 17",
    "headliners": "Headliners",
    "scheduleTbc": "Schedule TBC",
    "bands": {
      "marduk": { "name": "Marduk", "genre": "Black Metal", "country": "Sweden" },
      "metalChurch": { "name": "Metal Church", "genre": "Heavy / Power Metal", "country": "USA" },
      "possessed": { "name": "Possessed", "genre": "Death Metal", "country": "USA" },
      "grave": { "name": "Grave", "genre": "Death Metal", "country": "Sweden" },
      "armoredSaint": { "name": "Armored Saint", "genre": "Heavy Metal", "country": "USA" },
      "crimsonGlory": { "name": "Crimson Glory", "genre": "Progressive Metal", "country": "USA" },
      "pestilence": { "name": "Pestilence", "genre": "Death Metal", "country": "Netherlands" },
      "sacrifice": { "name": "Sacrifice", "genre": "Thrash Metal", "country": "Canada" },
      "hirax": { "name": "Hirax", "genre": "Thrash Metal", "country": "USA" },
      "hellripper": { "name": "Hellripper", "genre": "Speed / Black Metal", "country": "Scotland" },
      "bloodFeast": { "name": "Blood Feast", "genre": "Thrash Metal", "country": "USA" }
    }
  },
  "registration": {
    "title": "How to Register",
    "subtitle": "Entry is free but requires pre-registration.",
    "step1Title": "Visit the official site",
    "step1Desc": "Go to the San Luis Metal Fest registration page.",
    "step2Title": "Complete your registration",
    "step2Desc": "Provide your name, email address and official ID.",
    "step3Title": "Get your confirmation",
    "step3Desc": "You'll receive an email with your access code and event instructions.",
    "note": "Valid government-issued ID is required for entry."
  },
  "attendeeGuide": {
    "title": "Attendee Guide",
    "subtitle": "Everything you need to know to enjoy the festival.",
    "bringTitle": "What to bring",
    "bringItems": "Sunscreen, ear plugs, reusable water bottle, cash and cards, comfortable clothes and shoes, official ID",
    "prohibitedTitle": "Prohibited items",
    "prohibitedItems": "Weapons and sharp objects, glass bottles, illegal drugs, pets, drones, folding chairs",
    "tipsTitle": "Pit Etiquette",
    "tipsDesc": "If someone falls, pick them up. Respect others' boundaries. Stay hydrated between sets. Side areas are great if you prefer watching without contact."
  },
  "culture": {
    "title": "More Than Metal: Food & Culture",
    "subtitle": "The festival features unique experiences celebrating the richness of San Luis Potosí.",
    "gastroTitle": "Gastronomy Pavilion",
    "gastroDesc": "Try enchiladas potosinas, Huasteca tacos, zacahuil and more regional delicacies. Food trucks and craft beverages available.",
    "huastecaTitle": "Huasteca Culture Pavilion",
    "huastecaDesc": "Huasteca art exhibition, traditional dances, handicrafts and huapango music. A window into the state's cultural heritage."
  },
  "gettingThere": {
    "title": "Getting There",
    "venue": "Teatro del Pueblo — FENAPO Grounds",
    "address": "Av. Fco. Martínez de la Vega No. 255, San Luis Potosí",
    "byCarTitle": "By car",
    "byCarDesc": "Ample parking available at the venue. From downtown, take Av. Salvador Nava south (~15 min).",
    "byTransitTitle": "Public transit",
    "byTransitDesc": "Bus routes passing FENAPO grounds: 10, 12, 17. Taxis and Uber readily available.",
    "byPlaneTitle": "From the airport",
    "byPlaneDesc": "SLP Airport (BJX) is a 20-minute drive. Taxis available at the terminal.",
    "hotelsTitle": "Nearby hotels",
    "hotelsDesc": "Hotels along Av. Carranza and Centro Histórico (10-15 min from venue). Book in advance."
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "q1": "Is San Luis Metal Fest really free?",
    "a1": "Yes. Entry is completely free, but online pre-registration is required. You'll receive an access code via email.",
    "q2": "Can minors attend?",
    "a2": "Yes, minors can attend accompanied by a responsible adult with valid ID. Hearing protection is recommended for children.",
    "q3": "Can I bring my own water?",
    "a3": "Yes, reusable water bottles are allowed (no glass). Free hydration stations will also be available inside the venue.",
    "q4": "Is re-entry allowed?",
    "a4": "Yes, re-entry is allowed by showing your access wristband. Don't lose your wristband.",
    "q5": "Are there ATMs at the venue?",
    "a5": "Yes, there are ATMs inside the FENAPO grounds. However, bringing cash is recommended as some food vendors may not accept cards.",
    "q6": "Can I bring a camera?",
    "a6": "Compact cameras and phones are allowed. Professional cameras with detachable lenses require press accreditation.",
    "q7": "Is the venue accessible for people with disabilities?",
    "a7": "Yes, the FENAPO grounds have access ramps and designated areas for people with disabilities.",
    "q8": "What time should I arrive?",
    "a8": "Gates open at 12:00 PM. Arriving early is recommended to avoid lines and get a good spot near the stage."
  },
  "cta": {
    "title": "Don't Miss San Luis Metal Fest 2026",
    "description": "The first international metal festival in San Luis Potosí. Two days of extreme music, gastronomy and culture. Free entry.",
    "register": "Register for free",
    "moreEvents": "See more events in SLP"
  }
}
```

Add to `public/locales/de/common.json`:

```json
"metalFest2026": {
  "seo": {
    "title": "San Luis Metal Fest 2026 — Kostenloses Metal-Festival in San Luis Potosí",
    "description": "San Luis Metal Fest 2026: 16.–17. Mai. KOSTENLOSER EINTRITT. Marduk, Possessed, Metal Church, Grave, Armored Saint und mehr. Erstes internationales Metal-Festival in SLP.",
    "keywords": "san luis metal fest 2026, metal festival san luis potosi, metal fest slp, metal konzerte mexiko, marduk mexiko 2026"
  },
  "hero": {
    "badge": "1. AUSGABE — KOSTENLOSER EINTRITT",
    "date": "16. — 17. Mai 2026",
    "title": "San Luis Metal Fest",
    "subtitle": "Das Erwachen der Dunkelheit",
    "description": "Das erste internationale Metal-Festival in San Luis Potosí. Zwei Tage legendäre Bands aus 8 Ländern, Gastronomie, Huasteca-Kultur und Mexikos beste Metal-Community.",
    "cta": "Kostenlos registrieren",
    "ctaLineup": "Line-up ansehen"
  },
  "stats": {
    "days": "Tage",
    "daysValue": "2",
    "bands": "Bands",
    "bandsValue": "15+",
    "attendees": "Erwartete Besucher",
    "attendeesValue": "30.000+",
    "countries": "Länder",
    "countriesValue": "8+",
    "price": "Eintritt",
    "priceValue": "Gratis"
  },
  "lineup": {
    "title": "Offizielles Line-up",
    "subtitle": "Legendäre Bands aus Thrash, Death, Black und Heavy Metal aus aller Welt.",
    "day1": "Tag 1 — Samstag, 16. Mai",
    "day2": "Tag 2 — Sonntag, 17. Mai",
    "headliners": "Headliner",
    "scheduleTbc": "Zeiten werden noch bekannt gegeben",
    "bands": {
      "marduk": { "name": "Marduk", "genre": "Black Metal", "country": "Schweden" },
      "metalChurch": { "name": "Metal Church", "genre": "Heavy / Power Metal", "country": "USA" },
      "possessed": { "name": "Possessed", "genre": "Death Metal", "country": "USA" },
      "grave": { "name": "Grave", "genre": "Death Metal", "country": "Schweden" },
      "armoredSaint": { "name": "Armored Saint", "genre": "Heavy Metal", "country": "USA" },
      "crimsonGlory": { "name": "Crimson Glory", "genre": "Progressive Metal", "country": "USA" },
      "pestilence": { "name": "Pestilence", "genre": "Death Metal", "country": "Niederlande" },
      "sacrifice": { "name": "Sacrifice", "genre": "Thrash Metal", "country": "Kanada" },
      "hirax": { "name": "Hirax", "genre": "Thrash Metal", "country": "USA" },
      "hellripper": { "name": "Hellripper", "genre": "Speed / Black Metal", "country": "Schottland" },
      "bloodFeast": { "name": "Blood Feast", "genre": "Thrash Metal", "country": "USA" }
    }
  },
  "registration": {
    "title": "So registrierst du dich",
    "subtitle": "Der Eintritt ist kostenlos, erfordert aber eine Voranmeldung.",
    "step1Title": "Offizielle Website besuchen",
    "step1Desc": "Gehe zur Registrierungsseite des San Luis Metal Fest.",
    "step2Title": "Registrierung abschließen",
    "step2Desc": "Gib deinen Namen, deine E-Mail-Adresse und einen gültigen Ausweis an.",
    "step3Title": "Bestätigung erhalten",
    "step3Desc": "Du erhältst eine E-Mail mit deinem Zugangscode und Veranstaltungshinweisen.",
    "note": "Ein gültiger amtlicher Ausweis ist für den Zugang erforderlich."
  },
  "attendeeGuide": {
    "title": "Besucherleitfaden",
    "subtitle": "Alles, was du wissen musst, um das Festival zu genießen.",
    "bringTitle": "Was mitbringen",
    "bringItems": "Sonnenschutz, Ohrstöpsel, wiederverwendbare Wasserflasche, Bargeld und Karten, bequeme Kleidung und Schuhe, Ausweis",
    "prohibitedTitle": "Verbotene Gegenstände",
    "prohibitedItems": "Waffen und scharfe Gegenstände, Glasflaschen, illegale Drogen, Haustiere, Drohnen, Klappstühle",
    "tipsTitle": "Pit-Etikette",
    "tipsDesc": "Wenn jemand fällt, hilf ihm auf. Respektiere die Grenzen anderer. Bleib zwischen den Sets hydriert. Seitenbereiche sind ideal, wenn du ohne Kontakt zusehen möchtest."
  },
  "culture": {
    "title": "Mehr als Metal: Essen & Kultur",
    "subtitle": "Das Festival bietet einzigartige Erlebnisse, die den Reichtum von San Luis Potosí feiern.",
    "gastroTitle": "Gastronomie-Pavillon",
    "gastroDesc": "Probiere Enchiladas Potosinas, Huasteca-Tacos, Zacahuil und weitere regionale Spezialitäten. Food Trucks und Craft-Getränke.",
    "huastecaTitle": "Huasteca-Kulturpavillon",
    "huastecaDesc": "Huasteca-Kunstausstellung, traditionelle Tänze, Kunsthandwerk und Huapango-Musik. Ein Fenster zum kulturellen Erbe des Bundesstaates."
  },
  "gettingThere": {
    "title": "Anfahrt",
    "venue": "Teatro del Pueblo — FENAPO-Gelände",
    "address": "Av. Fco. Martínez de la Vega Nr. 255, San Luis Potosí",
    "byCarTitle": "Mit dem Auto",
    "byCarDesc": "Ausreichend Parkplätze am Veranstaltungsort. Vom Zentrum die Av. Salvador Nava Richtung Süden nehmen (~15 Min.).",
    "byTransitTitle": "Öffentliche Verkehrsmittel",
    "byTransitDesc": "Buslinien am FENAPO-Gelände: 10, 12, 17. Taxis und Uber verfügbar.",
    "byPlaneTitle": "Vom Flughafen",
    "byPlaneDesc": "Der Flughafen SLP (BJX) ist 20 Autominuten entfernt. Taxis am Terminal verfügbar.",
    "hotelsTitle": "Hotels in der Nähe",
    "hotelsDesc": "Hotels an der Av. Carranza und im Centro Histórico (10-15 Min. vom Gelände). Frühzeitig buchen."
  },
  "faq": {
    "title": "Häufig gestellte Fragen",
    "q1": "Ist das San Luis Metal Fest wirklich kostenlos?",
    "a1": "Ja. Der Eintritt ist völlig kostenlos, aber eine Online-Voranmeldung ist erforderlich. Du erhältst einen Zugangscode per E-Mail.",
    "q2": "Dürfen Minderjährige teilnehmen?",
    "a2": "Ja, Minderjährige können in Begleitung eines verantwortlichen Erwachsenen mit gültigem Ausweis teilnehmen. Gehörschutz wird für Kinder empfohlen.",
    "q3": "Kann ich eigenes Wasser mitbringen?",
    "a3": "Ja, wiederverwendbare Wasserflaschen sind erlaubt (kein Glas). Kostenlose Trinkstationen sind ebenfalls im Gelände verfügbar.",
    "q4": "Ist Wiedereintritt möglich?",
    "a4": "Ja, Wiedereintritt ist mit dem Zugangsarmband möglich. Verliere dein Armband nicht.",
    "q5": "Gibt es Geldautomaten am Veranstaltungsort?",
    "a5": "Ja, es gibt Geldautomaten auf dem FENAPO-Gelände. Bargeld wird empfohlen, da einige Essensstände keine Karten akzeptieren.",
    "q6": "Darf ich eine Kamera mitbringen?",
    "a6": "Kompaktkameras und Handys sind erlaubt. Profikameras mit Wechselobjektiven erfordern eine Presseakkreditierung.",
    "q7": "Ist der Veranstaltungsort barrierefrei?",
    "a7": "Ja, das FENAPO-Gelände verfügt über Rampen und ausgewiesene Bereiche für Menschen mit Behinderungen.",
    "q8": "Wann sollte ich ankommen?",
    "a8": "Die Tore öffnen um 12:00 Uhr. Frühes Kommen wird empfohlen, um Warteschlangen zu vermeiden und einen guten Platz vor der Bühne zu bekommen."
  },
  "cta": {
    "title": "Verpasse nicht das San Luis Metal Fest 2026",
    "description": "Das erste internationale Metal-Festival in San Luis Potosí. Zwei Tage Extremmusik, Gastronomie und Kultur. Kostenloser Eintritt.",
    "register": "Kostenlos registrieren",
    "moreEvents": "Mehr Events in SLP"
  }
}
```

Add to `public/locales/ja/common.json`:

```json
"metalFest2026": {
  "seo": {
    "title": "サンルイス・メタルフェスト 2026 — サンルイスポトシの無料メタルフェスティバル",
    "description": "サンルイス・メタルフェスト 2026：5月16〜17日。入場無料。Marduk、Possessed、Metal Church、Grave、Armored Saintほか。SLP初の国際メタルフェスティバル。",
    "keywords": "サンルイス メタルフェスト 2026, メタル フェスティバル メキシコ, metal fest slp"
  },
  "hero": {
    "badge": "第1回 — 入場無料",
    "date": "2026年5月16日〜17日",
    "title": "サンルイス・メタルフェスト",
    "subtitle": "闇の覚醒",
    "description": "サンルイスポトシ初の国際メタルフェスティバル。8カ国から伝説的バンドが集結する2日間。グルメ、ワステカ文化、メキシコ最高のメタルコミュニティ。",
    "cta": "無料で登録",
    "ctaLineup": "ラインナップを見る"
  },
  "stats": {
    "days": "日間",
    "daysValue": "2",
    "bands": "バンド",
    "bandsValue": "15+",
    "attendees": "予想来場者数",
    "attendeesValue": "3万+",
    "countries": "カ国",
    "countriesValue": "8+",
    "price": "入場",
    "priceValue": "無料"
  },
  "lineup": {
    "title": "公式ラインナップ",
    "subtitle": "世界中のスラッシュ、デス、ブラック、ヘヴィメタルの伝説的バンド。",
    "day1": "1日目 — 5月16日（土）",
    "day2": "2日目 — 5月17日（日）",
    "headliners": "ヘッドライナー",
    "scheduleTbc": "タイムテーブル確認中",
    "bands": {
      "marduk": { "name": "Marduk", "genre": "ブラックメタル", "country": "スウェーデン" },
      "metalChurch": { "name": "Metal Church", "genre": "ヘヴィ / パワーメタル", "country": "アメリカ" },
      "possessed": { "name": "Possessed", "genre": "デスメタル", "country": "アメリカ" },
      "grave": { "name": "Grave", "genre": "デスメタル", "country": "スウェーデン" },
      "armoredSaint": { "name": "Armored Saint", "genre": "ヘヴィメタル", "country": "アメリカ" },
      "crimsonGlory": { "name": "Crimson Glory", "genre": "プログレッシブメタル", "country": "アメリカ" },
      "pestilence": { "name": "Pestilence", "genre": "デスメタル", "country": "オランダ" },
      "sacrifice": { "name": "Sacrifice", "genre": "スラッシュメタル", "country": "カナダ" },
      "hirax": { "name": "Hirax", "genre": "スラッシュメタル", "country": "アメリカ" },
      "hellripper": { "name": "Hellripper", "genre": "スピード / ブラックメタル", "country": "スコットランド" },
      "bloodFeast": { "name": "Blood Feast", "genre": "スラッシュメタル", "country": "アメリカ" }
    }
  },
  "registration": {
    "title": "登録方法",
    "subtitle": "入場無料ですが事前登録が必要です。",
    "step1Title": "公式サイトにアクセス",
    "step1Desc": "サンルイス・メタルフェストの登録ページにアクセスしてください。",
    "step2Title": "登録を完了",
    "step2Desc": "氏名、メールアドレス、身分証明書を提供してください。",
    "step3Title": "確認を受け取る",
    "step3Desc": "アクセスコードとイベント案内がメールで届きます。",
    "note": "入場には有効な身分証明書が必要です。"
  },
  "attendeeGuide": {
    "title": "来場者ガイド",
    "subtitle": "フェスティバルを楽しむために知っておくべきすべて。",
    "bringTitle": "持ち物",
    "bringItems": "日焼け止め、耳栓、再利用可能な水筒、現金とカード、動きやすい服と靴、身分証明書",
    "prohibitedTitle": "禁止物",
    "prohibitedItems": "武器・刃物、ガラス瓶、違法薬物、ペット、ドローン、折りたたみ椅子",
    "tipsTitle": "ピットのマナー",
    "tipsDesc": "誰かが倒れたら助け起こしましょう。他の人の境界を尊重しましょう。セット間に水分補給を。接触なしで見たい場合はサイドエリアがおすすめです。"
  },
  "culture": {
    "title": "メタルだけじゃない：グルメ＆文化",
    "subtitle": "サンルイスポトシの豊かさを祝うユニークな体験もあります。",
    "gastroTitle": "グルメパビリオン",
    "gastroDesc": "エンチラーダス・ポトシーナス、ワステカタコス、サカウィルなど郷土料理を堪能。フードトラックとクラフトドリンクも。",
    "huastecaTitle": "ワステカ文化パビリオン",
    "huastecaDesc": "ワステカアート展示、伝統舞踊、工芸品、ワパンゴ音楽。州の文化遺産への窓。"
  },
  "gettingThere": {
    "title": "アクセス",
    "venue": "テアトロ・デル・プエブロ — FENAPO会場",
    "address": "Av. Fco. Martínez de la Vega No. 255, サンルイスポトシ",
    "byCarTitle": "車で",
    "byCarDesc": "会場に広い駐車場あり。市街中心部からAv. Salvador Navaを南へ（約15分）。",
    "byTransitTitle": "公共交通機関",
    "byTransitDesc": "FENAPO会場を通るバス路線：10、12、17番。タクシーとUberも利用可能。",
    "byPlaneTitle": "空港から",
    "byPlaneDesc": "SLP空港（BJX）から車で20分。ターミナルでタクシー利用可能。",
    "hotelsTitle": "近くのホテル",
    "hotelsDesc": "Av. Carranza沿いとセントロ・イストリコ周辺のホテル（会場まで10〜15分）。早めの予約を推奨。"
  },
  "faq": {
    "title": "よくある質問",
    "q1": "サンルイス・メタルフェストは本当に無料ですか？",
    "a1": "はい。入場は完全無料ですが、事前のオンライン登録が必要です。メールでアクセスコードが届きます。",
    "q2": "未成年者は参加できますか？",
    "a2": "はい。身分証明書を持つ責任ある大人の同伴があれば参加可能です。お子様には聴覚保護を推奨します。",
    "q3": "水を持ち込めますか？",
    "a3": "はい。再利用可能な水筒の持ち込みは可能です（ガラス不可）。会場内に無料の給水ステーションもあります。",
    "q4": "再入場は可能ですか？",
    "a4": "はい。アクセスリストバンドを提示すれば再入場可能です。リストバンドをなくさないでください。",
    "q5": "会場にATMはありますか？",
    "a5": "はい。FENAPO会場内にATMがあります。ただし、一部の飲食店ではカードが使えないため現金を持参することを推奨します。",
    "q6": "カメラを持ち込めますか？",
    "a6": "コンパクトカメラとスマートフォンは持ち込み可能です。交換レンズ付きプロ用カメラにはプレス認定が必要です。",
    "q7": "会場はバリアフリーですか？",
    "a7": "はい。FENAPO会場にはスロープと障がい者専用エリアがあります。",
    "q8": "何時に到着すべきですか？",
    "a8": "開場は午後12時です。行列を避け、ステージ前の良い場所を確保するために早めの到着をお勧めします。"
  },
  "cta": {
    "title": "サンルイス・メタルフェスト 2026をお見逃しなく",
    "description": "サンルイスポトシ初の国際メタルフェスティバル。2日間のエクストリーム音楽、グルメ、文化。入場無料。",
    "register": "無料で登録",
    "moreEvents": "SLPのイベントをもっと見る"
  }
}
```

- [ ] **Step 2: Create Metal Fest page**

Create `src/pages/events/san-luis-metal-fest-2026.tsx`. The page follows the same pattern as `fenapo-2025.tsx` but uses `useTranslation` and adds Schema.org `MusicEvent` + `FAQPage` markup.

The page must contain these sections in order:
1. SEO component with `MusicEvent` + `FAQPage` + `BreadcrumbList` structured data
2. Hero section — dark gradient (`from-gray-950 via-red-950 to-purple-950`), badge, title, subtitle, stats grid, two CTAs
3. Lineup section — cards grid with band name, genre pill, country flag/text. Split into Day 1 / Day 2
4. Registration section — 3-step numbered cards
5. Attendee guide — 3-column grid: What to bring, Prohibited items, Pit etiquette
6. Food & Culture section — 2-column: Gastro pavilion + Huasteca pavilion
7. Getting there — sidebar-style with car, transit, plane, hotels
8. FAQ section — accordion or simple Q&A list (8 questions)
9. CTA section — gradient background, register CTA + link to more events

All text content comes from `t('metalFest2026.xxx')` translation keys. Use the `CalendarIcon`, `MapPinIcon`, `TicketIcon` from `@heroicons/react/24/outline` for consistency with existing pages. Include `getStaticProps` with `serverSideTranslations`.

The Schema.org `MusicEvent` must include `performer` array with all bands as `MusicGroup` entries. The `FAQPage` schema must include all 8 Q&A pairs from the translations.

- [ ] **Step 3: Verify file created**

Run: `ls src/pages/events/san-luis-metal-fest-2026.tsx`
Expected: file exists

- [ ] **Step 4: Commit**

```bash
git add src/pages/events/san-luis-metal-fest-2026.tsx public/locales/*/common.json
git commit -m "feat: add San Luis Metal Fest 2026 page with i18n (en/es/de/ja)"
```

---

### Task 3: Maratón Tangamanga 2026 Page + Translations

**Files:**
- Create: `src/pages/events/maraton-tangamanga-2026.tsx`
- Modify: `public/locales/es/common.json`
- Modify: `public/locales/en/common.json`
- Modify: `public/locales/de/common.json`
- Modify: `public/locales/ja/common.json`

- [ ] **Step 1: Add Maratón translation keys to all 4 locales**

Add to `public/locales/es/common.json`:

```json
"maraton2026": {
  "seo": {
    "title": "Maratón Tangamanga 2026 — 40 Aniversario | San Luis Potosí",
    "description": "BMW Maratón Internacional Tangamanga 2026: 28 de junio. 40 Aniversario. 5K, 10K, 21K y 42K. Certificado por World Athletics y FMAA. Inscripción, ruta, guía del corredor y toda la información.",
    "keywords": "maraton tangamanga 2026, maraton san luis potosi, medio maraton slp, carrera 10k slp, 42k tangamanga, inscripcion maraton tangamanga"
  },
  "hero": {
    "badge": "40 ANIVERSARIO",
    "date": "28 de Junio, 2026",
    "title": "Maratón Tangamanga",
    "subtitle": "BMW Maratón Internacional — 40ª Edición",
    "description": "Una de las carreras más antiguas y prestigiosas de México celebra 40 años. Corre por el Parque Tangamanga y el Centro Histórico de San Luis Potosí en 4 distancias.",
    "cta": "Inscríbete",
    "ctaRoute": "Ver ruta"
  },
  "stats": {
    "edition": "Edición",
    "editionValue": "40ª",
    "runners": "Corredores",
    "runnersValue": "15,000+",
    "distances": "Distancias",
    "distancesValue": "4",
    "certified": "Certificación",
    "certifiedValue": "World Athletics"
  },
  "distances": {
    "title": "Categorías y Distancias",
    "subtitle": "Elige tu distancia y prepárate para correr en una de las carreras más emblemáticas de México.",
    "fiveK": {
      "name": "5K Recreativa",
      "description": "Ideal para principiantes y familias. Recorrido dentro del Parque Tangamanga.",
      "age": "Edad mínima: 15 años",
      "start": "Salida: 7:30 AM"
    },
    "tenK": {
      "name": "10K",
      "description": "Ruta mixta por el parque y calles aledañas. Categorías por edad y género.",
      "age": "Edad mínima: 16 años",
      "start": "Salida: 7:00 AM"
    },
    "halfMarathon": {
      "name": "Medio Maratón (21K)",
      "description": "Recorrido certificado FMAA por Parque Tangamanga, Av. Salvador Nava y Centro Histórico.",
      "age": "Edad mínima: 18 años",
      "start": "Salida: 6:30 AM"
    },
    "marathon": {
      "name": "Maratón (42K)",
      "description": "Ruta completa certificada World Athletics y FMAA. El recorrido más emblemático de SLP.",
      "age": "Edad mínima: 20 años",
      "start": "Salida: 6:00 AM"
    }
  },
  "route": {
    "title": "Mapa de Ruta",
    "subtitle": "El recorrido atraviesa los paisajes más icónicos de San Luis Potosí.",
    "description": "La ruta parte del Parque Tangamanga I, sube por Av. Salvador Nava hacia el Centro Histórico, pasa por la Plaza de los Fundadores y la Catedral, y regresa al parque. El maratón completo repite un circuito modificado.",
    "hydration": "Puntos de hidratación cada 2.5 km con agua y bebida isotónica.",
    "medical": "Puestos de atención médica en km 5, 10, 15, 21, 30 y meta.",
    "landmarks": "Puntos de interés: Parque Tangamanga, Av. Carranza, Plaza de Armas, Catedral Metropolitana, Teatro de la Paz."
  },
  "runnerGuide": {
    "title": "Guía del Corredor",
    "subtitle": "Consejos esenciales para tu carrera en San Luis Potosí.",
    "altitudeTitle": "Altitud",
    "altitudeDesc": "San Luis Potosí está a 1,860 metros sobre el nivel del mar. Si vienes de una ciudad baja, llega al menos 2 días antes para aclimatarte. La altitud afecta tu ritmo y recuperación.",
    "weatherTitle": "Clima en junio",
    "weatherDesc": "Temperatura entre 15°C (salida) y 28°C (mediodía). Posibles lluvias vespertinas. Usa ropa ligera, gorra y protector solar. Hidrátate más de lo habitual.",
    "hydrationTitle": "Hidratación",
    "hydrationDesc": "Por la altitud, necesitas más agua de lo normal. Bebe 500ml 2 horas antes de la salida. Aprovecha cada punto de hidratación en la ruta.",
    "warmupTitle": "Calentamiento",
    "warmupDesc": "La zona de calentamiento está en la explanada principal del Parque Tangamanga. Llega al menos 45 minutos antes de tu hora de salida."
  },
  "kit": {
    "title": "Kit del Corredor",
    "subtitle": "Todo lo que recibes y necesitas saber para la entrega de paquetes.",
    "includes": "El kit incluye",
    "includesList": "Playera oficial del 40 aniversario, número de competidor, chip de cronometraje, medalla finisher (al completar), bolsa de corredor con productos patrocinadores",
    "pickupTitle": "Entrega de paquetes",
    "pickupDesc": "Expo Maratón en Parque Tangamanga. Viernes 26 y sábado 27 de junio, de 10:00 AM a 7:00 PM. Lleva tu comprobante de inscripción e identificación oficial.",
    "docsTitle": "Documentos necesarios",
    "docsDesc": "Comprobante de inscripción (impreso o digital), identificación oficial vigente, certificado médico deportivo (obligatorio para 21K y 42K)."
  },
  "spectators": {
    "title": "Info para Acompañantes",
    "subtitle": "Apoya a tu corredor desde los mejores puntos del recorrido.",
    "viewingTitle": "Mejores puntos para ver la carrera",
    "viewingDesc": "Meta en Parque Tangamanga (llegada), Av. Salvador Nava (km 8-10), Plaza de Armas en Centro Histórico (km 15), Av. Carranza (km 18-20).",
    "parkingTitle": "Estacionamiento",
    "parkingDesc": "Estacionamientos disponibles en el Parque Tangamanga y calles aledañas. Llega temprano — los espacios se llenan rápido el día de la carrera.",
    "activitiesTitle": "Qué hacer mientras esperas",
    "activitiesDesc": "El Parque Tangamanga cuenta con áreas verdes, lago, zona de juegos infantiles y cafeterías. El Centro Histórico está a 15 minutos."
  },
  "accommodation": {
    "title": "Hospedaje y Transporte",
    "airportTitle": "Desde el aeropuerto",
    "airportDesc": "El Aeropuerto Internacional de SLP (BJX) está a 25 minutos del Parque Tangamanga. Taxis y servicio de transporte disponibles.",
    "busTitle": "Desde la central de autobuses",
    "busDesc": "La Central de Autobuses está a 20 minutos del parque. Conexiones directas desde CDMX, Monterrey, Guadalajara y Querétaro.",
    "hotelsTitle": "Hoteles recomendados",
    "hotelsDesc": "Zona Tangamanga Sur: hoteles a 5-10 min del parque. Centro Histórico: hoteles con encanto colonial a 15 min. Reserva con anticipación — junio es temporada alta por el maratón."
  },
  "faq": {
    "title": "Preguntas Frecuentes",
    "q1": "¿Cuándo abren las inscripciones?",
    "a1": "Las inscripciones generalmente abren en enero. Consulta maratontangamanga.com para fechas exactas y precios por categoría. Los precios suben conforme se acerca el evento.",
    "q2": "¿Necesito certificado médico?",
    "a2": "Sí, para las distancias de 21K y 42K es obligatorio presentar un certificado médico deportivo vigente (máximo 6 meses de antigüedad) al recoger tu kit.",
    "q3": "¿Hay servicio de pacemakers?",
    "a3": "Sí, el maratón cuenta con pacemakers oficiales para los tiempos de 3:30, 4:00, 4:30 y 5:00 horas en el maratón, y 1:45 y 2:00 en el medio maratón.",
    "q4": "¿Cuál es el tiempo límite?",
    "a4": "Maratón: 6 horas. Medio maratón: 3 horas. 10K: 1 hora 30 minutos. 5K: 45 minutos.",
    "q5": "¿La altitud afecta el rendimiento?",
    "a5": "Sí. A 1,860m sobre el nivel del mar, espera un rendimiento 5-10% menor que a nivel del mar. Llega 2-3 días antes para aclimatarte y ajusta tu ritmo objetivo.",
    "q6": "¿Puedo cambiar de distancia después de inscribirme?",
    "a6": "Los cambios de distancia están sujetos a disponibilidad y se permiten hasta 2 semanas antes del evento, con posible ajuste de tarifa.",
    "q7": "¿Hay guardería de bolsas?",
    "a7": "Sí, hay servicio de guardería de bolsas en la zona de salida/meta en el Parque Tangamanga. Se recomienda no dejar objetos de valor.",
    "q8": "¿Cómo consulto mis resultados?",
    "a8": "Los resultados se publican en tiempo real en la web del maratón y en la app oficial. El chip de cronometraje registra tiempos parciales y netos.",
    "q9": "¿Hay estaciones de hidratación?",
    "a9": "Sí, cada 2.5 km hay estaciones de hidratación con agua, bebida isotónica y en algunos puntos, fruta (plátano y naranja).",
    "q10": "¿Se permite correr con audífonos?",
    "a10": "Sí, se permite el uso de audífonos, pero se recomienda usarlos a bajo volumen para escuchar instrucciones de los jueces y vehículos de emergencia."
  },
  "cta": {
    "title": "Corre el Maratón Tangamanga 2026",
    "description": "Celebra 40 años de historia en una de las carreras más emblemáticas de México. 4 distancias, ruta certificada y el paisaje de San Luis Potosí.",
    "register": "Inscríbete ahora",
    "moreEvents": "Ver más eventos en SLP"
  }
}
```

Add to `public/locales/en/common.json`:

```json
"maraton2026": {
  "seo": {
    "title": "Tangamanga Marathon 2026 — 40th Anniversary | San Luis Potosí",
    "description": "BMW Tangamanga International Marathon 2026: June 28. 40th Anniversary. 5K, 10K, 21K & 42K. World Athletics & FMAA certified. Registration, route, runner's guide and all info.",
    "keywords": "tangamanga marathon 2026, marathon san luis potosi, half marathon slp, 10k slp, 42k tangamanga, tangamanga marathon registration"
  },
  "hero": {
    "badge": "40TH ANNIVERSARY",
    "date": "June 28, 2026",
    "title": "Tangamanga Marathon",
    "subtitle": "BMW International Marathon — 40th Edition",
    "description": "One of Mexico's oldest and most prestigious road races celebrates 40 years. Run through Tangamanga Park and the Historic Center of San Luis Potosí in 4 distances.",
    "cta": "Register now",
    "ctaRoute": "See route"
  },
  "stats": {
    "edition": "Edition",
    "editionValue": "40th",
    "runners": "Runners",
    "runnersValue": "15,000+",
    "distances": "Distances",
    "distancesValue": "4",
    "certified": "Certification",
    "certifiedValue": "World Athletics"
  },
  "distances": {
    "title": "Race Categories & Distances",
    "subtitle": "Choose your distance and get ready to run one of Mexico's most iconic races.",
    "fiveK": {
      "name": "5K Fun Run",
      "description": "Ideal for beginners and families. Route within Tangamanga Park.",
      "age": "Minimum age: 15",
      "start": "Start: 7:30 AM"
    },
    "tenK": {
      "name": "10K",
      "description": "Mixed route through the park and surrounding streets. Age and gender categories.",
      "age": "Minimum age: 16",
      "start": "Start: 7:00 AM"
    },
    "halfMarathon": {
      "name": "Half Marathon (21K)",
      "description": "FMAA-certified course through Tangamanga Park, Av. Salvador Nava and Historic Center.",
      "age": "Minimum age: 18",
      "start": "Start: 6:30 AM"
    },
    "marathon": {
      "name": "Marathon (42K)",
      "description": "Full World Athletics & FMAA-certified course. The most iconic route in SLP.",
      "age": "Minimum age: 20",
      "start": "Start: 6:00 AM"
    }
  },
  "route": {
    "title": "Route Map",
    "subtitle": "The course crosses San Luis Potosí's most iconic landscapes.",
    "description": "The route starts at Tangamanga Park I, goes up Av. Salvador Nava toward the Historic Center, passes Plaza de los Fundadores and the Cathedral, then returns to the park. The full marathon repeats a modified loop.",
    "hydration": "Hydration points every 2.5 km with water and sports drink.",
    "medical": "Medical stations at km 5, 10, 15, 21, 30 and finish line.",
    "landmarks": "Landmarks: Tangamanga Park, Av. Carranza, Plaza de Armas, Metropolitan Cathedral, Teatro de la Paz."
  },
  "runnerGuide": {
    "title": "Runner's Guide",
    "subtitle": "Essential tips for running in San Luis Potosí.",
    "altitudeTitle": "Altitude",
    "altitudeDesc": "San Luis Potosí sits at 1,860 meters (6,100 ft) above sea level. If you're coming from a low-altitude city, arrive at least 2 days early to acclimatize. Altitude affects your pace and recovery.",
    "weatherTitle": "June weather",
    "weatherDesc": "Temperature between 15°C (59°F) at start and 28°C (82°F) at midday. Possible afternoon showers. Wear light clothing, a cap and sunscreen. Hydrate more than usual.",
    "hydrationTitle": "Hydration",
    "hydrationDesc": "At this altitude, you need more water than usual. Drink 500ml 2 hours before start. Take advantage of every hydration point on the course.",
    "warmupTitle": "Warm-up",
    "warmupDesc": "The warm-up zone is at the main esplanade of Tangamanga Park. Arrive at least 45 minutes before your start time."
  },
  "kit": {
    "title": "Runner's Kit",
    "subtitle": "Everything you receive and need to know for packet pickup.",
    "includes": "Kit includes",
    "includesList": "Official 40th anniversary shirt, race bib number, timing chip, finisher medal (upon completion), runner's bag with sponsor products",
    "pickupTitle": "Packet pickup",
    "pickupDesc": "Marathon Expo at Tangamanga Park. Friday June 26 and Saturday June 27, 10:00 AM to 7:00 PM. Bring your registration confirmation and official ID.",
    "docsTitle": "Required documents",
    "docsDesc": "Registration confirmation (printed or digital), valid government-issued ID, sports medical certificate (required for 21K and 42K)."
  },
  "spectators": {
    "title": "Spectator Info",
    "subtitle": "Support your runner from the best viewing spots along the course.",
    "viewingTitle": "Best viewing spots",
    "viewingDesc": "Finish line at Tangamanga Park, Av. Salvador Nava (km 8-10), Plaza de Armas in Historic Center (km 15), Av. Carranza (km 18-20).",
    "parkingTitle": "Parking",
    "parkingDesc": "Parking available at Tangamanga Park and surrounding streets. Arrive early — spots fill up fast on race day.",
    "activitiesTitle": "Things to do while waiting",
    "activitiesDesc": "Tangamanga Park has green areas, a lake, playgrounds and cafés. The Historic Center is 15 minutes away."
  },
  "accommodation": {
    "title": "Accommodation & Transport",
    "airportTitle": "From the airport",
    "airportDesc": "SLP International Airport (BJX) is 25 minutes from Tangamanga Park. Taxis and shuttle service available.",
    "busTitle": "From the bus station",
    "busDesc": "The Central Bus Station is 20 minutes from the park. Direct connections from Mexico City, Monterrey, Guadalajara and Querétaro.",
    "hotelsTitle": "Recommended hotels",
    "hotelsDesc": "Tangamanga Sur area: hotels 5-10 min from the park. Historic Center: charming colonial hotels 15 min away. Book in advance — June is peak season due to the marathon."
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "q1": "When does registration open?",
    "a1": "Registration usually opens in January. Check maratontangamanga.com for exact dates and prices by category. Prices increase as the event approaches.",
    "q2": "Do I need a medical certificate?",
    "a2": "Yes, for 21K and 42K distances a valid sports medical certificate is required (issued within the last 6 months) when picking up your kit.",
    "q3": "Are there pacemakers?",
    "a3": "Yes, the marathon has official pacemakers for 3:30, 4:00, 4:30 and 5:00 hours in the marathon, and 1:45 and 2:00 in the half marathon.",
    "q4": "What is the time limit?",
    "a4": "Marathon: 6 hours. Half marathon: 3 hours. 10K: 1 hour 30 minutes. 5K: 45 minutes.",
    "q5": "Does altitude affect performance?",
    "a5": "Yes. At 1,860m above sea level, expect 5-10% lower performance than at sea level. Arrive 2-3 days early to acclimatize and adjust your target pace.",
    "q6": "Can I change distance after registering?",
    "a6": "Distance changes are subject to availability and allowed up to 2 weeks before the event, with a possible fee adjustment.",
    "q7": "Is there bag check?",
    "a7": "Yes, there is a bag check service at the start/finish area in Tangamanga Park. Avoid leaving valuables.",
    "q8": "How do I check my results?",
    "a8": "Results are posted in real-time on the marathon website and official app. The timing chip records split and net times.",
    "q9": "Are there hydration stations?",
    "a9": "Yes, every 2.5 km there are hydration stations with water, sports drink, and at some points, fruit (banana and orange).",
    "q10": "Can I run with headphones?",
    "a10": "Yes, headphones are allowed, but keeping the volume low is recommended so you can hear instructions from marshals and emergency vehicles."
  },
  "cta": {
    "title": "Run the Tangamanga Marathon 2026",
    "description": "Celebrate 40 years of history at one of Mexico's most iconic road races. 4 distances, certified course and the landscape of San Luis Potosí.",
    "register": "Register now",
    "moreEvents": "See more events in SLP"
  }
}
```

Add to `public/locales/de/common.json`:

```json
"maraton2026": {
  "seo": {
    "title": "Tangamanga-Marathon 2026 — 40. Jubiläum | San Luis Potosí",
    "description": "BMW Internationaler Tangamanga-Marathon 2026: 28. Juni. 40. Jubiläum. 5K, 10K, 21K & 42K. World Athletics & FMAA zertifiziert. Anmeldung, Strecke und Läuferguide.",
    "keywords": "tangamanga marathon 2026, marathon san luis potosi, halbmarathon slp, 42k tangamanga"
  },
  "hero": {
    "badge": "40. JUBILÄUM",
    "date": "28. Juni 2026",
    "title": "Tangamanga-Marathon",
    "subtitle": "BMW Internationaler Marathon — 40. Ausgabe",
    "description": "Einer der ältesten und prestigeträchtigsten Straßenläufe Mexikos feiert 40 Jahre. Laufe durch den Tangamanga-Park und die Altstadt von San Luis Potosí in 4 Distanzen.",
    "cta": "Jetzt anmelden",
    "ctaRoute": "Strecke ansehen"
  },
  "stats": {
    "edition": "Ausgabe",
    "editionValue": "40.",
    "runners": "Läufer",
    "runnersValue": "15.000+",
    "distances": "Distanzen",
    "distancesValue": "4",
    "certified": "Zertifizierung",
    "certifiedValue": "World Athletics"
  },
  "distances": {
    "title": "Kategorien & Distanzen",
    "subtitle": "Wähle deine Distanz und bereite dich auf eines der ikonischsten Rennen Mexikos vor.",
    "fiveK": { "name": "5K Volkslauf", "description": "Ideal für Anfänger und Familien. Strecke im Tangamanga-Park.", "age": "Mindestalter: 15 Jahre", "start": "Start: 7:30 Uhr" },
    "tenK": { "name": "10K", "description": "Gemischte Strecke durch Park und umliegende Straßen. Alters- und Geschlechtskategorien.", "age": "Mindestalter: 16 Jahre", "start": "Start: 7:00 Uhr" },
    "halfMarathon": { "name": "Halbmarathon (21K)", "description": "FMAA-zertifizierte Strecke durch Tangamanga-Park, Av. Salvador Nava und Altstadt.", "age": "Mindestalter: 18 Jahre", "start": "Start: 6:30 Uhr" },
    "marathon": { "name": "Marathon (42K)", "description": "Volle World Athletics & FMAA-zertifizierte Strecke. Die ikonischste Route in SLP.", "age": "Mindestalter: 20 Jahre", "start": "Start: 6:00 Uhr" }
  },
  "route": {
    "title": "Streckenkarte",
    "subtitle": "Die Strecke führt durch die ikonischsten Landschaften von San Luis Potosí.",
    "description": "Die Route startet im Tangamanga-Park I, führt die Av. Salvador Nava hinauf zur Altstadt, vorbei an der Plaza de los Fundadores und der Kathedrale und zurück zum Park.",
    "hydration": "Verpflegungspunkte alle 2,5 km mit Wasser und Sportgetränk.",
    "medical": "Medizinische Stationen bei km 5, 10, 15, 21, 30 und Ziel.",
    "landmarks": "Sehenswürdigkeiten: Tangamanga-Park, Av. Carranza, Plaza de Armas, Metropolitankathedrale, Teatro de la Paz."
  },
  "runnerGuide": {
    "title": "Läuferguide",
    "subtitle": "Wichtige Tipps fürs Laufen in San Luis Potosí.",
    "altitudeTitle": "Höhenlage",
    "altitudeDesc": "San Luis Potosí liegt auf 1.860 m über dem Meeresspiegel. Komme mindestens 2 Tage vorher zur Akklimatisierung. Die Höhe beeinflusst dein Tempo und deine Erholung.",
    "weatherTitle": "Wetter im Juni",
    "weatherDesc": "Temperaturen zwischen 15°C (Start) und 28°C (Mittag). Mögliche Nachmittagsschauer. Leichte Kleidung, Kappe und Sonnenschutz tragen.",
    "hydrationTitle": "Flüssigkeitszufuhr",
    "hydrationDesc": "In dieser Höhe brauchst du mehr Wasser als gewöhnlich. Trinke 500ml 2 Stunden vor dem Start.",
    "warmupTitle": "Aufwärmen",
    "warmupDesc": "Die Aufwärmzone befindet sich auf der Hauptesplanade des Tangamanga-Parks. Komme mindestens 45 Minuten vor deiner Startzeit."
  },
  "kit": {
    "title": "Läuferpaket",
    "subtitle": "Alles was du erhältst und zur Paketabholung wissen musst.",
    "includes": "Paket enthält",
    "includesList": "Offizielles 40-Jubiläums-Shirt, Startnummer, Zeitmesschip, Finisher-Medaille, Läufertasche mit Sponsorprodukten",
    "pickupTitle": "Paketabholung",
    "pickupDesc": "Marathon-Expo im Tangamanga-Park. Freitag 26. und Samstag 27. Juni, 10:00-19:00 Uhr. Anmeldebestätigung und Ausweis mitbringen.",
    "docsTitle": "Erforderliche Dokumente",
    "docsDesc": "Anmeldebestätigung (gedruckt oder digital), gültiger Ausweis, Sportärztliches Attest (Pflicht für 21K und 42K)."
  },
  "spectators": {
    "title": "Info für Zuschauer",
    "subtitle": "Unterstütze deinen Läufer von den besten Aussichtspunkten.",
    "viewingTitle": "Beste Zuschauerpunkte",
    "viewingDesc": "Ziel im Tangamanga-Park, Av. Salvador Nava (km 8-10), Plaza de Armas (km 15), Av. Carranza (km 18-20).",
    "parkingTitle": "Parken",
    "parkingDesc": "Parkplätze am Tangamanga-Park und in umliegenden Straßen. Früh kommen — Plätze füllen sich schnell am Renntag.",
    "activitiesTitle": "Aktivitäten beim Warten",
    "activitiesDesc": "Der Park bietet Grünflächen, einen See, Spielplätze und Cafés. Die Altstadt ist 15 Minuten entfernt."
  },
  "accommodation": {
    "title": "Unterkunft & Anreise",
    "airportTitle": "Vom Flughafen",
    "airportDesc": "Der Flughafen SLP (BJX) ist 25 Minuten vom Tangamanga-Park entfernt.",
    "busTitle": "Vom Busbahnhof",
    "busDesc": "Der Busbahnhof ist 20 Minuten vom Park entfernt. Direktverbindungen von Mexiko-Stadt, Monterrey, Guadalajara und Querétaro.",
    "hotelsTitle": "Empfohlene Hotels",
    "hotelsDesc": "Tangamanga-Süd: Hotels 5-10 Min. vom Park. Altstadt: Kolonialhotels 15 Min. entfernt. Frühzeitig buchen — Juni ist Hochsaison."
  },
  "faq": {
    "title": "Häufig gestellte Fragen",
    "q1": "Wann öffnet die Anmeldung?", "a1": "Die Anmeldung öffnet gewöhnlich im Januar. Aktuelle Termine und Preise auf maratontangamanga.com.",
    "q2": "Brauche ich ein ärztliches Attest?", "a2": "Ja, für 21K und 42K ist ein sportärztliches Attest (max. 6 Monate alt) bei der Paketabholung erforderlich.",
    "q3": "Gibt es Tempomacher?", "a3": "Ja. Offizielle Pacemaker für 3:30, 4:00, 4:30 und 5:00 im Marathon sowie 1:45 und 2:00 im Halbmarathon.",
    "q4": "Was ist das Zeitlimit?", "a4": "Marathon: 6 Stunden. Halbmarathon: 3 Stunden. 10K: 1:30 Stunden. 5K: 45 Minuten.",
    "q5": "Beeinflusst die Höhe die Leistung?", "a5": "Ja. Auf 1.860m erwarte 5-10% weniger Leistung als auf Meereshöhe. Komme 2-3 Tage vorher.",
    "q6": "Kann ich die Distanz nach der Anmeldung ändern?", "a6": "Änderungen sind bis 2 Wochen vor dem Event möglich, abhängig von Verfügbarkeit.",
    "q7": "Gibt es eine Gepäckaufbewahrung?", "a7": "Ja, im Start-/Zielbereich im Tangamanga-Park. Keine Wertsachen abgeben.",
    "q8": "Wie sehe ich meine Ergebnisse?", "a8": "Ergebnisse werden live auf der Marathon-Website und der offiziellen App veröffentlicht.",
    "q9": "Gibt es Verpflegungsstationen?", "a9": "Ja, alle 2,5 km mit Wasser, Sportgetränk und teilweise Obst (Banane und Orange).",
    "q10": "Darf ich mit Kopfhörern laufen?", "a10": "Ja, aber mit niedriger Lautstärke, um Anweisungen von Streckenposten und Einsatzfahrzeugen zu hören."
  },
  "cta": {
    "title": "Laufe den Tangamanga-Marathon 2026",
    "description": "Feiere 40 Jahre Geschichte bei einem der ikonischsten Straßenläufe Mexikos. 4 Distanzen, zertifizierte Strecke.",
    "register": "Jetzt anmelden",
    "moreEvents": "Mehr Events in SLP"
  }
}
```

Add to `public/locales/ja/common.json`:

```json
"maraton2026": {
  "seo": {
    "title": "タンガマンガ・マラソン 2026 — 40周年 | サンルイスポトシ",
    "description": "BMWタンガマンガ国際マラソン 2026：6月28日。40周年記念。5K、10K、21K、42K。World Athletics・FMAA公認。登録・コース・ランナーガイド。",
    "keywords": "タンガマンガ マラソン 2026, サンルイスポトシ マラソン, ハーフマラソン slp, 42k タンガマンガ"
  },
  "hero": {
    "badge": "40周年記念",
    "date": "2026年6月28日",
    "title": "タンガマンガ・マラソン",
    "subtitle": "BMW国際マラソン — 第40回",
    "description": "メキシコで最も歴史と格式あるロードレースのひとつが40周年。タンガマンガ公園とサンルイスポトシ歴史地区を4つの距離で走ろう。",
    "cta": "今すぐ登録",
    "ctaRoute": "コースを見る"
  },
  "stats": {
    "edition": "回目",
    "editionValue": "40",
    "runners": "ランナー",
    "runnersValue": "1.5万+",
    "distances": "距離",
    "distancesValue": "4",
    "certified": "認定",
    "certifiedValue": "World Athletics"
  },
  "distances": {
    "title": "カテゴリーと距離",
    "subtitle": "距離を選んで、メキシコで最も象徴的なレースのひとつに備えよう。",
    "fiveK": { "name": "5Kファンラン", "description": "初心者やファミリーに最適。タンガマンガ公園内のコース。", "age": "参加年齢：15歳以上", "start": "スタート：午前7:30" },
    "tenK": { "name": "10K", "description": "公園と周辺道路を走るミックスコース。年齢・性別カテゴリー。", "age": "参加年齢：16歳以上", "start": "スタート：午前7:00" },
    "halfMarathon": { "name": "ハーフマラソン（21K）", "description": "FMAA公認コース。タンガマンガ公園、サルバドール・ナバ通り、歴史地区。", "age": "参加年齢：18歳以上", "start": "スタート：午前6:30" },
    "marathon": { "name": "フルマラソン（42K）", "description": "World Athletics・FMAA完全公認コース。SLPで最も象徴的なルート。", "age": "参加年齢：20歳以上", "start": "スタート：午前6:00" }
  },
  "route": {
    "title": "コースマップ",
    "subtitle": "サンルイスポトシの最も象徴的な景観を横断するコース。",
    "description": "タンガマンガ公園Iをスタートし、サルバドール・ナバ通りを上って歴史地区へ。フンダドーレス広場と大聖堂を通過し公園に戻ります。",
    "hydration": "2.5kmごとに水分補給ポイント（水とスポーツドリンク）。",
    "medical": "km 5、10、15、21、30、ゴール地点に医療ステーション。",
    "landmarks": "見どころ：タンガマンガ公園、カランサ通り、アルマス広場、大聖堂、テアトロ・デ・ラ・パス。"
  },
  "runnerGuide": {
    "title": "ランナーズガイド",
    "subtitle": "サンルイスポトシでのランニングに必須のヒント。",
    "altitudeTitle": "高地",
    "altitudeDesc": "サンルイスポトシは海抜1,860m。低地から来る場合は少なくとも2日前に到着して順応を。高地はペースと回復に影響します。",
    "weatherTitle": "6月の天候",
    "weatherDesc": "気温はスタート時15°C〜正午28°C。午後にわか雨の可能性あり。軽い服装、帽子、日焼け止めを。通常より多めに水分補給。",
    "hydrationTitle": "水分補給",
    "hydrationDesc": "この高度では通常より多くの水分が必要。スタート2時間前に500ml飲みましょう。",
    "warmupTitle": "ウォーミングアップ",
    "warmupDesc": "ウォーミングアップゾーンはタンガマンガ公園のメインエスプラネード。スタート45分前には到着を。"
  },
  "kit": {
    "title": "ランナーズキット",
    "subtitle": "受け取り内容とパケットピックアップについて。",
    "includes": "キット内容",
    "includesList": "40周年記念公式Tシャツ、ゼッケン、計測チップ、完走メダル、スポンサー商品入りランナーバッグ",
    "pickupTitle": "パケットピックアップ",
    "pickupDesc": "マラソンEXPO（タンガマンガ公園）。6月26日（金）・27日（土）10:00〜19:00。登録確認書と身分証明書をお持ちください。",
    "docsTitle": "必要書類",
    "docsDesc": "登録確認書（印刷またはデジタル）、有効な身分証明書、スポーツ健康診断書（21Kと42Kは必須）。"
  },
  "spectators": {
    "title": "応援者情報",
    "subtitle": "コース沿いのベストスポットからランナーを応援しよう。",
    "viewingTitle": "おすすめ観戦スポット",
    "viewingDesc": "タンガマンガ公園ゴール地点、サルバドール・ナバ通り（km 8-10）、アルマス広場（km 15）、カランサ通り（km 18-20）。",
    "parkingTitle": "駐車場",
    "parkingDesc": "タンガマンガ公園と周辺道路に駐車場あり。レース当日は早めに到着を。",
    "activitiesTitle": "待ち時間の過ごし方",
    "activitiesDesc": "タンガマンガ公園には緑地、湖、遊び場、カフェがあります。歴史地区まで15分。"
  },
  "accommodation": {
    "title": "宿泊・交通",
    "airportTitle": "空港から",
    "airportDesc": "SLP国際空港（BJX）からタンガマンガ公園まで25分。タクシーとシャトルサービスあり。",
    "busTitle": "バスターミナルから",
    "busDesc": "バスターミナルから公園まで20分。メキシコシティ、モンテレイ、グアダラハラ、ケレタロから直行便。",
    "hotelsTitle": "おすすめホテル",
    "hotelsDesc": "タンガマンガ南エリア：公園から5〜10分のホテル。歴史地区：コロニアルホテルまで15分。6月はマラソンで混むため早めの予約を。"
  },
  "faq": {
    "title": "よくある質問",
    "q1": "登録はいつ開始？", "a1": "通常1月に開始。maratontangamanga.comで最新の日程と料金を確認してください。",
    "q2": "健康診断書は必要？", "a2": "21Kと42Kでは、6ヶ月以内のスポーツ健康診断書がキット受け取り時に必要です。",
    "q3": "ペースメーカーはいる？", "a3": "マラソン3:30、4:00、4:30、5:00、ハーフマラソン1:45、2:00の公式ペースメーカーがいます。",
    "q4": "制限時間は？", "a4": "マラソン：6時間。ハーフ：3時間。10K：1時間30分。5K：45分。",
    "q5": "高地はパフォーマンスに影響する？", "a5": "はい。海抜1,860mでは海面レベルより5〜10%低下します。2〜3日前に到着して順応を。",
    "q6": "登録後に距離変更できる？", "a6": "空きがあればイベント2週間前まで変更可能。料金調整あり。",
    "q7": "荷物預かりはある？", "a7": "はい。タンガマンガ公園のスタート/ゴールエリアにあります。貴重品は避けてください。",
    "q8": "結果の確認方法は？", "a8": "マラソンウェブサイトと公式アプリでリアルタイム公開。計測チップがスプリットとネットタイムを記録。",
    "q9": "給水所はある？", "a9": "2.5kmごとに水、スポーツドリンク、一部フルーツ（バナナ・オレンジ）あり。",
    "q10": "ヘッドフォンで走れる？", "a10": "はい。ただし審判や緊急車両の指示が聞こえるよう低音量を推奨。"
  },
  "cta": {
    "title": "タンガマンガ・マラソン 2026を走ろう",
    "description": "メキシコで最も象徴的なロードレースのひとつで40年の歴史を祝おう。4距離、公認コース、サンルイスポトシの景観。",
    "register": "今すぐ登録",
    "moreEvents": "SLPのイベントをもっと見る"
  }
}
```

- [ ] **Step 2: Create Maratón page**

Create `src/pages/events/maraton-tangamanga-2026.tsx`. Same structural pattern as Metal Fest page but with:
- Green/teal sport gradient (`from-emerald-950 via-teal-900 to-blue-950`) in hero
- Schema.org `SportsEvent` with `sport: "Running"`, `maximumAttendeeCapacity: 17000`
- `FAQPage` schema with 10 Q&A pairs
- `BreadcrumbList` schema
- Sections: Hero → Stats → Distances (4 cards) → Route Map → Runner's Guide (4-card grid) → Kit → Spectator Info → Accommodation → FAQ (10 questions) → CTA
- All text from `t('maraton2026.xxx')` keys
- `getStaticProps` with `serverSideTranslations`

- [ ] **Step 3: Verify file created**

Run: `ls src/pages/events/maraton-tangamanga-2026.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/pages/events/maraton-tangamanga-2026.tsx public/locales/*/common.json
git commit -m "feat: add Maratón Tangamanga 2026 page with i18n (en/es/de/ja)"
```

---

### Task 4: FENAPO 2026 Page + Translations

**Files:**
- Create: `src/pages/events/fenapo-2026.tsx`
- Modify: `public/locales/es/common.json`
- Modify: `public/locales/en/common.json`
- Modify: `public/locales/de/common.json`
- Modify: `public/locales/ja/common.json`

- [ ] **Step 1: Add FENAPO 2026 translation keys to all 4 locales**

Add to `public/locales/es/common.json`:

```json
"fenapo2026": {
  "seo": {
    "title": "FENAPO 2026 — Feria Nacional Potosina | San Luis Potosí",
    "description": "FENAPO 2026: La feria más tradicional de México. Agosto 2026 en San Luis Potosí. Grupo Firme, Sin Bandera, Los Acosta. Teatro del Pueblo, Palenque, gastronomía, juegos mecánicos. Programa, artistas y guía del visitante.",
    "keywords": "fenapo 2026, feria nacional potosina, fenapo san luis potosi, cartelera fenapo 2026, grupo firme fenapo, palenque fenapo, teatro del pueblo fenapo"
  },
  "hero": {
    "badge": "EDICIÓN 2026",
    "date": "Agosto 2026",
    "title": "FENAPO 2026",
    "subtitle": "Feria Nacional Potosina",
    "description": "La feria más tradicional de México regresa a San Luis Potosí con conciertos, gastronomía, cultura y entretenimiento para toda la familia. Artistas confirmados: Grupo Firme, Sin Bandera, Los Acosta.",
    "note": "Programa completo por confirmar — esta página se actualiza conforme se anuncien artistas y fechas.",
    "cta": "Sitio oficial",
    "ctaArtists": "Ver artistas"
  },
  "stats": {
    "days": "Días",
    "daysValue": "~24",
    "artists": "Artistas confirmados",
    "artistsValue": "3+",
    "entry": "Entrada general",
    "entryValue": "Gratis",
    "zones": "Zonas",
    "zonesValue": "6+"
  },
  "about": {
    "title": "¿Qué es la FENAPO?",
    "p1": "La Feria Nacional Potosina (FENAPO) es la feria más importante y tradicional de México. Se celebra cada año durante el mes de agosto en San Luis Potosí, coincidiendo con las fiestas patronales en honor a San Luis Rey de Francia (25 de agosto), patrono de la ciudad.",
    "p2": "Con más de medio siglo de historia, la FENAPO reúne cultura, entretenimiento, gastronomía y comercio en el Recinto Ferial, un espacio de más de 30 hectáreas que se transforma durante casi un mes en el centro de la vida social potosina.",
    "p3": "La feria tiene un impacto económico superior a los 2,000 millones de pesos y atrae a más de 3 millones de visitantes cada edición, consolidándose como el evento turístico más importante del estado.",
    "highlights": {
      "title": "Lo que encontrarás en FENAPO:",
      "item1": "Teatro del Pueblo con artistas nacionales e internacionales (entrada gratuita)",
      "item2": "Palenque con los mejores exponentes de la música regional (boletos)",
      "item3": "Zona gastronómica con cocina potosina, mexicana e internacional",
      "item4": "Exposición comercial con productos locales y nacionales",
      "item5": "Juegos mecánicos y entretenimiento familiar",
      "item6": "Exposición ganadera y agropecuaria",
      "item7": "Pabellón cultural con arte y artesanías",
      "item8": "Coronación de la reina de la FENAPO"
    }
  },
  "artists": {
    "title": "Artistas Confirmados",
    "subtitle": "La cartelera se actualiza conforme se anuncian artistas. Regresa pronto para ver las últimas novedades.",
    "teatroTitle": "Teatro del Pueblo",
    "teatroNote": "Entrada gratuita",
    "palenqueTitle": "Palenque",
    "palenqueNote": "Boletos a la venta",
    "tbc": "Más artistas por confirmar",
    "sinBandera": "Sin Bandera",
    "losAcosta": "Los Acosta",
    "grupoFirme": "Grupo Firme"
  },
  "areas": {
    "title": "Áreas de la Feria",
    "subtitle": "El Recinto Ferial se divide en zonas para que encuentres exactamente lo que buscas.",
    "teatro": { "name": "Teatro del Pueblo", "desc": "Escenario principal con artistas de primer nivel. Conciertos gratuitos todas las noches." },
    "palenque": { "name": "Palenque", "desc": "Espectáculos premium con los mejores exponentes de la música mexicana y regional." },
    "gastro": { "name": "Zona Gastronómica", "desc": "Comida potosina, mexicana e internacional. Enchiladas, gorditas, asado de boda y más." },
    "commercial": { "name": "Exposición Comercial", "desc": "Productos y servicios locales y nacionales. Ofertas y promociones exclusivas de feria." },
    "rides": { "name": "Juegos Mecánicos", "desc": "Montaña rusa, rueda de la fortuna, carros chocones y más diversión para toda la familia." },
    "cultural": { "name": "Pabellón Cultural", "desc": "Exposiciones de arte, artesanías, danza y música tradicional potosina." },
    "livestock": { "name": "Exposición Ganadera", "desc": "Exhibición de ganado, charreadas y tradiciones rancheras de San Luis Potosí." },
    "kids": { "name": "Zona Infantil", "desc": "Actividades y espectáculos diseñados para los más pequeños de la familia." }
  },
  "visitorGuide": {
    "title": "Guía del Visitante",
    "subtitle": "Todo lo que necesitas saber para disfrutar al máximo tu visita a la FENAPO.",
    "bestDaysTitle": "Mejores días para ir",
    "bestDaysDesc": "De lunes a jueves hay menos gente y es más fácil moverse. Los viernes y sábados ofrecen los mejores espectáculos pero prepárate para multitudes. Los domingos son ideales para familias.",
    "bringTitle": "Qué llevar",
    "bringDesc": "Zapatos cómodos para caminar, protección solar, efectivo (algunos puestos no aceptan tarjeta), batería portátil para tu celular.",
    "safetyTitle": "Seguridad",
    "safetyDesc": "El recinto cuenta con seguridad privada y presencia policial. Cuida tus pertenencias en zonas concurridas. Hay módulos de información y primeros auxilios.",
    "familyTitle": "Visitas familiares",
    "familyDesc": "La zona infantil y los juegos mecánicos son ideales para niños. Evita los viernes y sábados si llevas niños pequeños por las multitudes."
  },
  "gettingThere": {
    "title": "Cómo Llegar",
    "venue": "Recinto Ferial de la FENAPO",
    "address": "Av. Fco. Martínez de la Vega No. 255, San Luis Potosí",
    "byCarTitle": "En auto",
    "byCarDesc": "Estacionamiento amplio dentro y fuera del recinto. Desde el centro, toma Av. Salvador Nava hacia el sur (~15 min). Espera tráfico en horas pico de la feria.",
    "byTransitTitle": "Transporte público",
    "byTransitDesc": "Rutas de camión: 10, 12, 17. Servicios especiales de transporte operan durante la feria. Taxis y Uber disponibles.",
    "byPlaneTitle": "Desde el aeropuerto",
    "byPlaneDesc": "El Aeropuerto de SLP está a 20 minutos. Taxis disponibles en la terminal.",
    "distanceTitle": "Desde el centro",
    "distanceDesc": "El recinto está a 15 minutos del Centro Histórico por Av. Salvador Nava."
  },
  "accommodation": {
    "title": "Hospedaje",
    "description": "Agosto es el mes más concurrido en SLP por la FENAPO. Reserva con anticipación.",
    "nearbyTitle": "Cerca del recinto",
    "nearbyDesc": "Hoteles en la zona de Av. Salvador Nava y Tangamanga Sur, a 5-10 minutos del recinto.",
    "centroTitle": "Centro Histórico",
    "centroDesc": "Hoteles boutique y coloniales en el centro, a 15 minutos. Ideal si quieres explorar la ciudad además de la feria.",
    "budgetTitle": "Presupuesto",
    "budgetDesc": "Los precios de hotel suben durante la FENAPO. Reservar con 2-3 meses de anticipación puede ahorrarte hasta un 40%."
  },
  "faq": {
    "title": "Preguntas Frecuentes",
    "q1": "¿Cuándo son las fechas exactas de FENAPO 2026?",
    "a1": "Las fechas oficiales de FENAPO 2026 aún no se confirman. Tradicionalmente la feria se celebra durante todo agosto, arrancando la primera semana y cerrando alrededor del 31. Esta página se actualizará cuando se anuncien las fechas exactas.",
    "q2": "¿Cuánto cuestan los boletos del Palenque?",
    "a2": "Los precios del Palenque varían según el artista, desde $500 hasta $3,000+ MXN. Los boletos se venden por Ticketmaster y en taquillas del recinto. Se agotan rápido para artistas populares.",
    "q3": "¿La entrada general es gratuita?",
    "a3": "La entrada al recinto ferial y al Teatro del Pueblo es gratuita. El Palenque, juegos mecánicos y algunos espectáculos especiales tienen costo adicional.",
    "q4": "¿Hay estacionamiento?",
    "a4": "Sí, hay estacionamiento dentro del recinto y en lotes aledaños. El costo varía. Llega temprano los fines de semana para encontrar lugar.",
    "q5": "¿Se puede llevar comida al recinto?",
    "a5": "No se permite ingresar alimentos ni bebidas al recinto. Hay una amplia zona gastronómica con opciones para todos los presupuestos.",
    "q6": "¿Cuál es el horario de la feria?",
    "a6": "Generalmente de 11:00 AM a 12:00 AM (medianoche) de lunes a jueves, y de 11:00 AM a 2:00 AM viernes y sábados. Los horarios pueden variar.",
    "q7": "¿Es seguro ir a la FENAPO?",
    "a7": "Sí. El recinto cuenta con seguridad privada, presencia policial y módulos de atención. Como en cualquier evento masivo, cuida tus pertenencias y evita llevar objetos de valor innecesarios.",
    "q8": "¿Se permiten mascotas?",
    "a8": "No, no se permiten mascotas dentro del recinto ferial por razones de seguridad y bienestar animal.",
    "q9": "¿Hay cajeros automáticos?",
    "a9": "Sí, hay cajeros dentro del recinto. Sin embargo, pueden tener filas largas. Se recomienda llevar efectivo suficiente.",
    "q10": "¿Es apto para niños?",
    "a10": "Sí, la FENAPO es un evento familiar. Hay zona infantil, juegos mecánicos para niños y espectáculos familiares. Los domingos suelen ser los mejores días para ir con niños.",
    "q11": "¿Cómo es el dress code?",
    "a11": "No hay dress code formal. Ropa casual y cómoda. Zapatos cerrados son recomendables por el terreno del recinto. Para el Palenque, la gente suele vestirse más arreglada.",
    "q12": "¿Hay accesibilidad para personas con discapacidad?",
    "a12": "El recinto cuenta con rampas de acceso y áreas designadas. Para el Teatro del Pueblo y Palenque hay secciones accesibles. Se recomienda llegar temprano para asegurar lugar."
  },
  "cta": {
    "title": "¡No te pierdas la FENAPO 2026!",
    "description": "La feria más tradicional de México. Casi un mes de cultura, entretenimiento, gastronomía y diversión para toda la familia en San Luis Potosí.",
    "official": "Sitio oficial",
    "newsletter": "Suscríbete para actualizaciones",
    "moreEvents": "Ver más eventos en SLP"
  }
}
```

Add to `public/locales/en/common.json`:

```json
"fenapo2026": {
  "seo": {
    "title": "FENAPO 2026 — National Potosino Fair | San Luis Potosí",
    "description": "FENAPO 2026: Mexico's most traditional fair. August 2026 in San Luis Potosí. Grupo Firme, Sin Bandera, Los Acosta. Teatro del Pueblo, Palenque, gastronomy, rides. Program, artists and visitor guide.",
    "keywords": "fenapo 2026, feria nacional potosina, fenapo san luis potosi, fenapo lineup 2026, grupo firme fenapo, palenque fenapo, teatro del pueblo"
  },
  "hero": {
    "badge": "2026 EDITION",
    "date": "August 2026",
    "title": "FENAPO 2026",
    "subtitle": "Feria Nacional Potosina",
    "description": "Mexico's most traditional fair returns to San Luis Potosí with concerts, gastronomy, culture and entertainment for the whole family. Confirmed artists: Grupo Firme, Sin Bandera, Los Acosta.",
    "note": "Full program TBC — this page updates as artists and dates are announced.",
    "cta": "Official website",
    "ctaArtists": "See artists"
  },
  "stats": {
    "days": "Days",
    "daysValue": "~24",
    "artists": "Confirmed artists",
    "artistsValue": "3+",
    "entry": "General entry",
    "entryValue": "Free",
    "zones": "Zones",
    "zonesValue": "6+"
  },
  "about": {
    "title": "What is FENAPO?",
    "p1": "The Feria Nacional Potosina (FENAPO) is Mexico's most important and traditional fair. Held every year during August in San Luis Potosí, it coincides with the patron saint festivities honoring San Luis Rey de Francia (August 25), the city's patron saint.",
    "p2": "With over half a century of history, FENAPO brings together culture, entertainment, gastronomy and commerce at the Recinto Ferial, a 30+ hectare venue that transforms for nearly a month into the center of Potosino social life.",
    "p3": "The fair generates over 2 billion pesos in economic impact and attracts more than 3 million visitors each edition, making it the state's most important tourism event.",
    "highlights": {
      "title": "What you'll find at FENAPO:",
      "item1": "Teatro del Pueblo with national and international artists (free entry)",
      "item2": "Palenque with the best of regional Mexican music (ticketed)",
      "item3": "Gastronomy zone with Potosino, Mexican and international cuisine",
      "item4": "Commercial exhibition with local and national products",
      "item5": "Mechanical rides and family entertainment",
      "item6": "Livestock and agricultural exhibition",
      "item7": "Cultural pavilion with art and handicrafts",
      "item8": "FENAPO queen coronation ceremony"
    }
  },
  "artists": {
    "title": "Confirmed Artists",
    "subtitle": "The lineup updates as artists are announced. Check back for the latest news.",
    "teatroTitle": "Teatro del Pueblo",
    "teatroNote": "Free entry",
    "palenqueTitle": "Palenque",
    "palenqueNote": "Tickets on sale",
    "tbc": "More artists TBA",
    "sinBandera": "Sin Bandera",
    "losAcosta": "Los Acosta",
    "grupoFirme": "Grupo Firme"
  },
  "areas": {
    "title": "Fair Areas",
    "subtitle": "The fairgrounds are divided into zones so you can find exactly what you're looking for.",
    "teatro": { "name": "Teatro del Pueblo", "desc": "Main stage with top-tier artists. Free concerts every night." },
    "palenque": { "name": "Palenque", "desc": "Premium shows with the best of Mexican and regional music." },
    "gastro": { "name": "Gastronomy Zone", "desc": "Potosino, Mexican and international food. Enchiladas, gorditas, asado de boda and more." },
    "commercial": { "name": "Commercial Exhibition", "desc": "Local and national products and services. Exclusive fair deals and promotions." },
    "rides": { "name": "Mechanical Rides", "desc": "Roller coaster, Ferris wheel, bumper cars and more fun for the whole family." },
    "cultural": { "name": "Cultural Pavilion", "desc": "Art exhibitions, handicrafts, dance and traditional Potosino music." },
    "livestock": { "name": "Livestock Exhibition", "desc": "Cattle exhibition, charreadas and ranching traditions of San Luis Potosí." },
    "kids": { "name": "Kids Zone", "desc": "Activities and shows designed for the youngest members of the family." }
  },
  "visitorGuide": {
    "title": "Visitor Guide",
    "subtitle": "Everything you need to know to make the most of your FENAPO visit.",
    "bestDaysTitle": "Best days to go",
    "bestDaysDesc": "Monday to Thursday is less crowded and easier to get around. Fridays and Saturdays offer the best shows but expect crowds. Sundays are ideal for families.",
    "bringTitle": "What to bring",
    "bringDesc": "Comfortable walking shoes, sun protection, cash (some vendors don't accept cards), portable phone charger.",
    "safetyTitle": "Safety",
    "safetyDesc": "The venue has private security and police presence. Watch your belongings in crowded areas. Information and first aid stations are available.",
    "familyTitle": "Family visits",
    "familyDesc": "The kids zone and rides are ideal for children. Avoid Fridays and Saturdays if bringing young children due to crowds."
  },
  "gettingThere": {
    "title": "Getting There",
    "venue": "Recinto Ferial de la FENAPO",
    "address": "Av. Fco. Martínez de la Vega No. 255, San Luis Potosí",
    "byCarTitle": "By car",
    "byCarDesc": "Ample parking inside and outside the venue. From downtown, take Av. Salvador Nava south (~15 min). Expect traffic during peak fair hours.",
    "byTransitTitle": "Public transit",
    "byTransitDesc": "Bus routes: 10, 12, 17. Special transport services operate during the fair. Taxis and Uber available.",
    "byPlaneTitle": "From the airport",
    "byPlaneDesc": "SLP Airport is 20 minutes away. Taxis available at the terminal.",
    "distanceTitle": "From downtown",
    "distanceDesc": "The venue is 15 minutes from the Historic Center via Av. Salvador Nava."
  },
  "accommodation": {
    "title": "Accommodation",
    "description": "August is SLP's busiest month due to FENAPO. Book in advance.",
    "nearbyTitle": "Near the venue",
    "nearbyDesc": "Hotels along Av. Salvador Nava and Tangamanga Sur, 5-10 minutes from the venue.",
    "centroTitle": "Historic Center",
    "centroDesc": "Boutique and colonial hotels downtown, 15 minutes away. Ideal if you want to explore the city beyond the fair.",
    "budgetTitle": "Budget tip",
    "budgetDesc": "Hotel prices rise during FENAPO. Booking 2-3 months ahead can save you up to 40%."
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "q1": "When are the exact dates for FENAPO 2026?",
    "a1": "Official dates for FENAPO 2026 are not yet confirmed. Traditionally the fair runs throughout August, starting the first week and closing around the 31st. This page will be updated when exact dates are announced.",
    "q2": "How much do Palenque tickets cost?",
    "a2": "Palenque prices vary by artist, from $500 to $3,000+ MXN. Tickets are sold through Ticketmaster and at venue box offices. Popular artists sell out quickly.",
    "q3": "Is general admission free?",
    "a3": "Entry to the fairgrounds and Teatro del Pueblo is free. The Palenque, rides and some special shows have additional costs.",
    "q4": "Is there parking?",
    "a4": "Yes, parking is available inside the venue and in nearby lots. Cost varies. Arrive early on weekends to find a spot.",
    "q5": "Can I bring food into the venue?",
    "a5": "Outside food and drinks are not allowed. There's a large gastronomy zone with options for all budgets.",
    "q6": "What are the fair hours?",
    "a6": "Generally 11:00 AM to 12:00 AM (midnight) Monday-Thursday, and 11:00 AM to 2:00 AM Friday-Saturday. Hours may vary.",
    "q7": "Is FENAPO safe?",
    "a7": "Yes. The venue has private security, police presence and assistance stations. As with any mass event, watch your belongings and avoid carrying unnecessary valuables.",
    "q8": "Are pets allowed?",
    "a8": "No, pets are not allowed inside the fairgrounds for safety and animal welfare reasons.",
    "q9": "Are there ATMs?",
    "a9": "Yes, there are ATMs inside the venue. However, lines can be long. Bringing enough cash is recommended.",
    "q10": "Is it kid-friendly?",
    "a10": "Yes, FENAPO is a family event. There's a kids zone, children's rides and family shows. Sundays are usually the best days to go with children.",
    "q11": "Is there a dress code?",
    "a11": "No formal dress code. Casual and comfortable clothing. Closed shoes are recommended for the venue terrain. For Palenque, people tend to dress up more.",
    "q12": "Is it accessible for people with disabilities?",
    "a12": "The venue has access ramps and designated areas. Teatro del Pueblo and Palenque have accessible sections. Arriving early is recommended to secure a spot."
  },
  "cta": {
    "title": "Don't Miss FENAPO 2026!",
    "description": "Mexico's most traditional fair. Nearly a month of culture, entertainment, gastronomy and fun for the whole family in San Luis Potosí.",
    "official": "Official website",
    "newsletter": "Subscribe for updates",
    "moreEvents": "See more events in SLP"
  }
}
```

Add to `public/locales/de/common.json`:

```json
"fenapo2026": {
  "seo": {
    "title": "FENAPO 2026 — Nationale Messe von Potosí | San Luis Potosí",
    "description": "FENAPO 2026: Mexikos traditionsreichste Messe. August 2026. Grupo Firme, Sin Bandera, Los Acosta. Programm, Künstler und Besucherguide.",
    "keywords": "fenapo 2026, feria nacional potosina, fenapo san luis potosi, fenapo programm 2026"
  },
  "hero": {
    "badge": "AUSGABE 2026",
    "date": "August 2026",
    "title": "FENAPO 2026",
    "subtitle": "Feria Nacional Potosina",
    "description": "Mexikos traditionsreichste Messe kehrt mit Konzerten, Gastronomie, Kultur und Unterhaltung für die ganze Familie zurück. Bestätigte Künstler: Grupo Firme, Sin Bandera, Los Acosta.",
    "note": "Vollständiges Programm wird noch bekannt gegeben — diese Seite wird aktualisiert.",
    "cta": "Offizielle Website",
    "ctaArtists": "Künstler ansehen"
  },
  "stats": { "days": "Tage", "daysValue": "~24", "artists": "Bestätigte Künstler", "artistsValue": "3+", "entry": "Allgemeiner Eintritt", "entryValue": "Gratis", "zones": "Bereiche", "zonesValue": "6+" },
  "about": {
    "title": "Was ist FENAPO?",
    "p1": "Die Feria Nacional Potosina (FENAPO) ist Mexikos wichtigste und traditionsreichste Messe. Sie findet jedes Jahr im August in San Luis Potosí statt und fällt mit den Patronatsfesten zu Ehren von San Luis Rey de Francia (25. August) zusammen.",
    "p2": "Mit über einem halben Jahrhundert Geschichte vereint die FENAPO Kultur, Unterhaltung, Gastronomie und Handel auf dem Recinto Ferial, einem über 30 Hektar großen Gelände.",
    "p3": "Die Messe erzielt einen wirtschaftlichen Effekt von über 2 Milliarden Pesos und zieht pro Ausgabe mehr als 3 Millionen Besucher an.",
    "highlights": {
      "title": "Was dich bei FENAPO erwartet:",
      "item1": "Teatro del Pueblo mit nationalen und internationalen Künstlern (kostenloser Eintritt)",
      "item2": "Palenque mit den besten Vertretern regionaler Musik (Tickets)",
      "item3": "Gastronomie-Zone mit potosiner, mexikanischer und internationaler Küche",
      "item4": "Handelsausstellung mit lokalen und nationalen Produkten",
      "item5": "Fahrgeschäfte und Familienunterhaltung",
      "item6": "Vieh- und Landwirtschaftsausstellung",
      "item7": "Kulturpavillon mit Kunst und Kunsthandwerk",
      "item8": "Krönungszeremonie der FENAPO-Königin"
    }
  },
  "artists": { "title": "Bestätigte Künstler", "subtitle": "Das Line-up wird bei Bekanntgabe aktualisiert.", "teatroTitle": "Teatro del Pueblo", "teatroNote": "Kostenloser Eintritt", "palenqueTitle": "Palenque", "palenqueNote": "Tickets im Verkauf", "tbc": "Weitere Künstler folgen", "sinBandera": "Sin Bandera", "losAcosta": "Los Acosta", "grupoFirme": "Grupo Firme" },
  "areas": {
    "title": "Messebereiche", "subtitle": "Das Gelände ist in Zonen unterteilt.",
    "teatro": { "name": "Teatro del Pueblo", "desc": "Hauptbühne mit erstklassigen Künstlern. Kostenlose Konzerte jeden Abend." },
    "palenque": { "name": "Palenque", "desc": "Premium-Shows mit der besten mexikanischen Musik." },
    "gastro": { "name": "Gastronomie-Zone", "desc": "Potosiner, mexikanische und internationale Küche." },
    "commercial": { "name": "Handelsausstellung", "desc": "Lokale und nationale Produkte und Dienstleistungen." },
    "rides": { "name": "Fahrgeschäfte", "desc": "Achterbahn, Riesenrad, Autoscooter und mehr." },
    "cultural": { "name": "Kulturpavillon", "desc": "Kunstausstellungen, Kunsthandwerk und traditionelle Musik." },
    "livestock": { "name": "Viehausstellung", "desc": "Viehausstellung, Charreadas und Ranchtraditionen." },
    "kids": { "name": "Kinderzone", "desc": "Aktivitäten und Shows für die Jüngsten." }
  },
  "visitorGuide": {
    "title": "Besucherguide", "subtitle": "Alles für deinen FENAPO-Besuch.",
    "bestDaysTitle": "Beste Tage", "bestDaysDesc": "Montag bis Donnerstag weniger voll. Freitag/Samstag beste Shows. Sonntags ideal für Familien.",
    "bringTitle": "Was mitbringen", "bringDesc": "Bequeme Schuhe, Sonnenschutz, Bargeld, Powerbank.",
    "safetyTitle": "Sicherheit", "safetyDesc": "Private Sicherheit und Polizeipräsenz. Auf Wertsachen achten.",
    "familyTitle": "Familienbesuche", "familyDesc": "Kinderzone und Fahrgeschäfte ideal für Kinder. Freitag/Samstag mit kleinen Kindern meiden."
  },
  "gettingThere": {
    "title": "Anfahrt", "venue": "Recinto Ferial de la FENAPO", "address": "Av. Fco. Martínez de la Vega Nr. 255, San Luis Potosí",
    "byCarTitle": "Mit dem Auto", "byCarDesc": "Ausreichend Parkplätze. Vom Zentrum Av. Salvador Nava Richtung Süden (~15 Min.).",
    "byTransitTitle": "ÖPNV", "byTransitDesc": "Buslinien: 10, 12, 17. Spezialbusse während der Messe. Taxis und Uber verfügbar.",
    "byPlaneTitle": "Vom Flughafen", "byPlaneDesc": "Flughafen SLP: 20 Minuten entfernt.",
    "distanceTitle": "Vom Zentrum", "distanceDesc": "15 Minuten vom Centro Histórico über Av. Salvador Nava."
  },
  "accommodation": {
    "title": "Unterkunft", "description": "August ist der geschäftigste Monat wegen der FENAPO. Frühzeitig buchen.",
    "nearbyTitle": "Nahe dem Gelände", "nearbyDesc": "Hotels an Av. Salvador Nava und Tangamanga Süd, 5-10 Min.",
    "centroTitle": "Altstadt", "centroDesc": "Boutique- und Kolonialhotels, 15 Min. entfernt.",
    "budgetTitle": "Spartipp", "budgetDesc": "2-3 Monate vorher buchen spart bis zu 40%."
  },
  "faq": {
    "title": "Häufig gestellte Fragen",
    "q1": "Wann sind die genauen Termine der FENAPO 2026?", "a1": "Die offiziellen Termine sind noch nicht bestätigt. Traditionell findet die Messe den ganzen August statt.",
    "q2": "Was kosten Palenque-Tickets?", "a2": "Preise variieren je nach Künstler, von 500 bis 3.000+ MXN. Ticketverkauf über Ticketmaster.",
    "q3": "Ist der allgemeine Eintritt kostenlos?", "a3": "Ja, Gelände und Teatro del Pueblo sind kostenlos. Palenque, Fahrgeschäfte und Sondershows kosten extra.",
    "q4": "Gibt es Parkplätze?", "a4": "Ja, auf dem Gelände und in der Nähe. Am Wochenende früh kommen.",
    "q5": "Darf man Essen mitbringen?", "a5": "Nein. Es gibt eine große Gastronomie-Zone mit Optionen für jedes Budget.",
    "q6": "Wann hat die Messe geöffnet?", "a6": "Mo-Do 11:00-24:00, Fr-Sa 11:00-2:00. Zeiten können variieren.",
    "q7": "Ist die FENAPO sicher?", "a7": "Ja. Private Sicherheit und Polizei vor Ort. Wertsachen im Auge behalten.",
    "q8": "Sind Haustiere erlaubt?", "a8": "Nein, aus Sicherheits- und Tierschutzgründen.",
    "q9": "Gibt es Geldautomaten?", "a9": "Ja, aber mit möglichen Warteschlangen. Bargeld mitbringen.",
    "q10": "Ist es kinderfreundlich?", "a10": "Ja. Kinderzone, Kinderfahrgeschäfte, Familienvorstellungen. Sonntags am besten mit Kindern.",
    "q11": "Gibt es einen Dresscode?", "a11": "Nein. Bequeme Freizeitkleidung. Geschlossene Schuhe empfohlen. Für den Palenque kleidet man sich eleganter.",
    "q12": "Ist es barrierefrei?", "a12": "Ja. Rampen und ausgewiesene Bereiche vorhanden. Früh kommen empfohlen."
  },
  "cta": {
    "title": "Verpasse die FENAPO 2026 nicht!",
    "description": "Mexikos traditionsreichste Messe. Fast ein Monat Kultur, Unterhaltung, Gastronomie und Spaß.",
    "official": "Offizielle Website",
    "newsletter": "Updates abonnieren",
    "moreEvents": "Mehr Events in SLP"
  }
}
```

Add to `public/locales/ja/common.json`:

```json
"fenapo2026": {
  "seo": {
    "title": "FENAPO 2026 — ポトシ国民祭 | サンルイスポトシ",
    "description": "FENAPO 2026：メキシコで最も伝統的な祭典。2026年8月。Grupo Firme、Sin Bandera、Los Acosta。プログラム、アーティスト、訪問者ガイド。",
    "keywords": "fenapo 2026, フェリア ナシオナル ポトシーナ, fenapo サンルイスポトシ"
  },
  "hero": {
    "badge": "2026年版",
    "date": "2026年8月",
    "title": "FENAPO 2026",
    "subtitle": "フェリア・ナシオナル・ポトシーナ",
    "description": "メキシコで最も伝統的な祭典がサンルイスポトシに帰ってきます。コンサート、グルメ、文化、家族向けエンターテイメント。出演確定：Grupo Firme、Sin Bandera、Los Acosta。",
    "note": "プログラム詳細は確認次第更新します。",
    "cta": "公式サイト",
    "ctaArtists": "アーティストを見る"
  },
  "stats": { "days": "日間", "daysValue": "約24", "artists": "出演確定", "artistsValue": "3+", "entry": "一般入場", "entryValue": "無料", "zones": "エリア", "zonesValue": "6+" },
  "about": {
    "title": "FENAPOとは？",
    "p1": "フェリア・ナシオナル・ポトシーナ（FENAPO）はメキシコで最も重要で伝統的な祭典です。毎年8月にサンルイスポトシで開催され、市の守護聖人サン・ルイス・レイ・デ・フランシア（8月25日）の祝祭と重なります。",
    "p2": "半世紀以上の歴史を持つFENAPOは、30ヘクタール以上の会場で文化、エンターテイメント、グルメ、商業を約1ヶ月間にわたって繰り広げます。",
    "p3": "経済効果は20億ペソを超え、毎回300万人以上の来場者を集める州最大の観光イベントです。",
    "highlights": {
      "title": "FENAPOで見つかるもの：",
      "item1": "テアトロ・デル・プエブロ — 国内外アーティスト（入場無料）",
      "item2": "パレンケ — メキシコ地域音楽の最高峰（チケット制）",
      "item3": "グルメゾーン — ポトシ、メキシコ、国際料理",
      "item4": "商業展示 — 地元・全国の製品",
      "item5": "遊園地アトラクション",
      "item6": "畜産・農業展示",
      "item7": "文化パビリオン — アートと工芸品",
      "item8": "FENAPOクイーン戴冠式"
    }
  },
  "artists": { "title": "出演確定アーティスト", "subtitle": "発表され次第更新されます。", "teatroTitle": "テアトロ・デル・プエブロ", "teatroNote": "入場無料", "palenqueTitle": "パレンケ", "palenqueNote": "チケット販売中", "tbc": "他のアーティストは追って発表", "sinBandera": "Sin Bandera", "losAcosta": "Los Acosta", "grupoFirme": "Grupo Firme" },
  "areas": {
    "title": "祭典エリア", "subtitle": "会場はゾーンに分かれています。",
    "teatro": { "name": "テアトロ・デル・プエブロ", "desc": "メインステージ。毎晩無料コンサート。" },
    "palenque": { "name": "パレンケ", "desc": "メキシコ音楽のプレミアムショー。" },
    "gastro": { "name": "グルメゾーン", "desc": "ポトシ料理、メキシコ料理、国際料理。" },
    "commercial": { "name": "商業展示", "desc": "地元・全国の製品とサービス。" },
    "rides": { "name": "遊園地", "desc": "ジェットコースター、観覧車、バンパーカーなど。" },
    "cultural": { "name": "文化パビリオン", "desc": "美術展、工芸品、伝統音楽。" },
    "livestock": { "name": "畜産展示", "desc": "家畜展示とチャレアーダ。" },
    "kids": { "name": "キッズゾーン", "desc": "お子様向けアクティビティとショー。" }
  },
  "visitorGuide": {
    "title": "訪問者ガイド", "subtitle": "FENAPOを最大限楽しむために。",
    "bestDaysTitle": "おすすめの曜日", "bestDaysDesc": "月〜木は空いています。金土はベストショーですが混雑。日曜は家族向け。",
    "bringTitle": "持ち物", "bringDesc": "歩きやすい靴、日焼け止め、現金、モバイルバッテリー。",
    "safetyTitle": "安全", "safetyDesc": "民間警備と警察が常駐。貴重品に注意。",
    "familyTitle": "家族連れ", "familyDesc": "キッズゾーンと遊園地あり。小さなお子様連れは金土を避けて。"
  },
  "gettingThere": {
    "title": "アクセス", "venue": "レシント・フェリアル・デ・ラ・FENAPO", "address": "Av. Fco. Martínez de la Vega No. 255, サンルイスポトシ",
    "byCarTitle": "車で", "byCarDesc": "広い駐車場あり。中心部からAv. Salvador Navaを南へ（約15分）。",
    "byTransitTitle": "公共交通", "byTransitDesc": "バス路線：10、12、17番。祭典期間は特別バスも運行。タクシー・Uber利用可。",
    "byPlaneTitle": "空港から", "byPlaneDesc": "SLP空港から20分。ターミナルにタクシーあり。",
    "distanceTitle": "中心部から", "distanceDesc": "歴史地区からAv. Salvador Nava経由で15分。"
  },
  "accommodation": {
    "title": "宿泊", "description": "8月はFENAPOでSLP最繁忙月。早めの予約を。",
    "nearbyTitle": "会場近く", "nearbyDesc": "Av. Salvador Nava・タンガマンガ南エリアのホテル（5〜10分）。",
    "centroTitle": "歴史地区", "centroDesc": "ブティック・コロニアルホテル（15分）。街の観光も楽しめます。",
    "budgetTitle": "節約ヒント", "budgetDesc": "2〜3ヶ月前の予約で最大40%節約。"
  },
  "faq": {
    "title": "よくある質問",
    "q1": "FENAPO 2026の正確な日程は？", "a1": "公式日程は未確定。伝統的に8月全期間開催。発表次第更新します。",
    "q2": "パレンケのチケット料金は？", "a2": "アーティストにより500〜3,000+ MXN。Ticketmasterと会場窓口で販売。",
    "q3": "一般入場は無料？", "a3": "はい。会場とテアトロ・デル・プエブロは無料。パレンケ等は別料金。",
    "q4": "駐車場はある？", "a4": "はい。会場内外にあり。週末は早めに。",
    "q5": "飲食物の持ち込みは？", "a5": "不可。幅広い予算に対応したグルメゾーンがあります。",
    "q6": "営業時間は？", "a6": "月〜木11:00〜24:00、金土11:00〜2:00。変更の可能性あり。",
    "q7": "安全ですか？", "a7": "はい。民間警備と警察が常駐。貴重品には注意を。",
    "q8": "ペットは可？", "a8": "安全と動物福祉のためペット不可。",
    "q9": "ATMはある？", "a9": "はい。ただし行列の可能性があるため現金持参推奨。",
    "q10": "子供向け？", "a10": "はい。キッズゾーン、子供向け遊具、ファミリーショーあり。日曜がおすすめ。",
    "q11": "ドレスコードは？", "a11": "なし。カジュアルでOK。閉じた靴推奨。パレンケではおしゃれする人が多い。",
    "q12": "バリアフリー？", "a12": "はい。スロープと専用エリアあり。早めの到着を推奨。"
  },
  "cta": {
    "title": "FENAPO 2026をお見逃しなく！",
    "description": "メキシコで最も伝統的な祭典。約1ヶ月の文化、エンターテイメント、グルメ、家族の楽しみ。",
    "official": "公式サイト",
    "newsletter": "更新を購読",
    "moreEvents": "SLPのイベントをもっと見る"
  }
}
```

- [ ] **Step 2: Create FENAPO 2026 page**

Create `src/pages/events/fenapo-2026.tsx`. Same structural pattern as Metal Fest page but with:
- Blue/purple gradient (`from-blue-950 via-purple-900 to-indigo-950`) in hero
- Schema.org `Festival` with `organizer: "Gobierno de San Luis Potosí"`
- `FAQPage` schema with 12 Q&A pairs
- `BreadcrumbList` schema
- "Program TBC" notice in hero
- Sections: Hero → Stats → About (history/context, rich editorial) → Confirmed Artists (Teatro + Palenque) → Fair Areas (8 cards) → Visitor Guide → Getting There → Accommodation → FAQ (12 questions) → CTA (with newsletter link)
- All text from `t('fenapo2026.xxx')` keys
- `getStaticProps` with `serverSideTranslations`

- [ ] **Step 3: Verify file created**

Run: `ls src/pages/events/fenapo-2026.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/pages/events/fenapo-2026.tsx public/locales/*/common.json
git commit -m "feat: add FENAPO 2026 page with i18n (en/es/de/ja)"
```

---

### Task 5: Homepage Integration

**Files:**
- Modify: `src/pages/index.tsx`

**Depends on:** Task 1 (EventCarouselBanner exists)

- [ ] **Step 1: Update homepage imports**

In `src/pages/index.tsx`, replace:
```tsx
import FestivalPrimaveraBanner from '@/components/FestivalPrimaveraBanner';
```
with:
```tsx
import EventCarouselBanner from '@/components/EventCarouselBanner';
```

- [ ] **Step 2: Replace banner in JSX**

In `src/pages/index.tsx`, replace:
```tsx
{/* FESTIVAL DE PRIMAVERA 2026 BANNER */}
<FestivalPrimaveraBanner />
```
with:
```tsx
{/* EVENT CAROUSEL BANNER */}
<EventCarouselBanner />
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.tsx
git commit -m "feat: replace FestivalPrimaveraBanner with EventCarouselBanner on homepage"
```

---

### Task 6: Build Verification & Testing

**Depends on:** All previous tasks

- [ ] **Step 1: Run build**

```bash
npx next build
```

Expected: Build succeeds with no errors. All 3 new pages should appear in the build output as static pages.

- [ ] **Step 2: Verify all pages exist in build output**

Look for these paths in build output:
- `/events/san-luis-metal-fest-2026`
- `/events/maraton-tangamanga-2026`
- `/events/fenapo-2026`

- [ ] **Step 3: Check for missing translation keys**

Start dev server and visit each page in all 4 locales:
- `http://localhost:3000/events/san-luis-metal-fest-2026`
- `http://localhost:3000/es/events/san-luis-metal-fest-2026`
- `http://localhost:3000/de/events/san-luis-metal-fest-2026`
- `http://localhost:3000/ja/events/san-luis-metal-fest-2026`

Repeat for maratón and FENAPO pages. Check browser console for i18next missing key warnings.

- [ ] **Step 4: Validate Schema.org**

View page source for each event page and verify:
- `application/ld+json` script tag exists
- Schema type matches (MusicEvent, SportsEvent, Festival)
- FAQPage schema has all Q&A pairs
- BreadcrumbList schema is present

- [ ] **Step 5: Verify homepage carousel**

Visit `http://localhost:3000` and verify:
- Carousel renders in the FestivalPrimaveraBanner position
- Auto-advances every 6 seconds
- Dot navigation works
- Each slide links to correct event page
- Pause on hover works

- [ ] **Step 6: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: resolve build issues for event pages"
```
