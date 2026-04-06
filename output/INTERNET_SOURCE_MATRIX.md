# Internet Source Matrix

Generated: 2026-04-06
Timezone: Asia/Jakarta

## Quick Conclusion

There are official online data sources that can complement this project beyond local PDF parsing.
The safest enrichment path is:

1. Use kelurahan-level and city-level official datasets as the primary online source.
2. Aggregate those datasets into the current puskesmas catchment map used by the dashboard.
3. Use official puskesmas websites mainly for profile, service, innovation, and narrative context.
4. Use PPID and BPS documents as supporting context, not as the first numeric source for puskesmas comparison.

## Priority Legend

- `P1`: strong official source; safe to use after light cleaning
- `P2`: official source, but needs transformation or careful mapping
- `P3`: supporting context only; useful for narrative, history, or cross-checking

## Catchment Map Used by Current Dashboard

Current local mapping was taken from `app/js/data.js` on 2026-04-06.

| Puskesmas | Kecamatan | Kelurahan in current dashboard |
| --- | --- | --- |
| Blooto | Prajuritkulon | Blooto, Surodinawan, Prajuritkulon |
| Mentikan | Prajuritkulon | Mentikan, Kauman, Miji, Pulorejo |
| Wates | Magersari | Wates |
| Gedongan | Magersari | Magersari, Gedongan, Balongsari, Kedundung, Jagalan, Purwotengah |
| Kranggan | Prajuritkulon | Meri, Kranggan |

## Source Matrix

| Priority | Source | Owner | Granularity | Best use in this project | Safe integration note |
| --- | --- | --- | --- | --- | --- |
| `P1` | [Profil Kesehatan Kota Mojokerto 2024](https://satikomo.mojokertokota.go.id/dataset/data/profil-kesehatan-kota-mojokerto-tahun-2024) | Dinkes P2KB / Satikomo | City | Health baseline, program context, validation of public health indicators | Use as city baseline and table-by-table cross-check; not automatically per puskesmas |
| `P1` | [Kategori data kesehatan Satikomo](https://satikomo.mojokertokota.go.id/group/kesehatankotamojokerto/s/title_string%2Basc) | Satikomo | Dataset index | Discovery of health CSV/XLSX assets | Use to discover newer structured datasets before scraping PDFs |
| `P1` | [Jumlah penduduk per kelurahan dan jenis kelamin](https://satikomo.mojokertokota.go.id/dataset/data/jumlah_penduduk_kota_mojokerto_per_kelurahan_dan_jenis_kelamin) | Dispendukcapil / Satikomo | Kelurahan | Population denominators per puskesmas after mapping | Strong candidate for direct aggregation into the dashboard catchment map |
| `P1` | [Profil Perkembangan Kependudukan Kota Mojokerto 2024](https://dispenduk.mojokertokota.go.id/public/doc/gisa/2025-06-17_11-58-18_Profil%20Perkembangan%20Kependudukan%20Kota%20Mojokerto%20Tahun%202024.pdf) | Dispendukcapil | City plus kelurahan tables | Demography, age structure, mobility, household context | Good for SDoH context; extract tables carefully and tie back to kelurahan |
| `P2` | [Jumlah kasus penyakit menular menurut kecamatan](https://satikomo.mojokertokota.go.id/dataset/data/jumlah-kasus-penyakit-menular-menurut-kecamatan) | Dinkes P2KB / Satikomo | Kecamatan | Disease burden context | Do not compare Blooto vs Mentikan directly from this source because both are in Prajuritkulon |
| `P2` | [Jumlah kasus penyakit tidak menular menurut kecamatan](https://satikomo.mojokertokota.go.id/dataset/data/jumlah-kasus-penyakit-tidak-menular-menurut-kecamatan) | Dinkes P2KB / Satikomo | Kecamatan | NCD context, SDoH pressure, narrative support | Safe for city and kecamatan context, not for direct per-puskesmas ranking |
| `P2` | [Operasional pelayanan puskesmas 2019-2024](https://satikomo.mojokertokota.go.id/dataset/data/umlah-perasional-elayanan-uskesmas-ahun-20192024) | Dinkes P2KB / Satikomo | Likely puskesmas or city service totals | Historical service operations | Validate schema before merging because the portal slug is malformed and fields may need normalization |
| `P2` | [Jumlah posyandu menurut kecamatan](https://satikomo.mojokertokota.go.id/dataset/data/jumlah-posyandu-menurut-kecamatan) | Dinkes P2KB / Satikomo | Kecamatan | Community health infrastructure context | Good support for capacity narrative; still needs catchment interpretation |
| `P2` | [Kepadatan penduduk 2019-2024](https://satikomo.mojokertokota.go.id/dataset/data/kepadatan-penduduk-ahun-20192024) | Dispendukcapil / Satikomo | City or kecamatan | Density pressure and urban service load | Use after checking the unit and administrative level in the actual file |
| `P2` | [Statistik Potensi Desa Kota Mojokerto 2024](https://mojokertokota.bps.go.id/id/publication/2024/12/24/007e3bc4b966212e0c624bcc/statistik-potensi-desa-kota-mojokerto-2024.html) | BPS Kota Mojokerto | Kelurahan or village facilities | Infrastructure, environment, local service ecosystem | Useful for non-clinical context around each kelurahan |
| `P2` | [Kecamatan Prajurit Kulon Dalam Angka 2024](https://mojokertokota.bps.go.id/id/publication/2024/09/26/42bf098a251c6c77be77bfda/kecamatan-prajurit-kulon-dalam-angka-2024.html) | BPS Kota Mojokerto | Kecamatan | Context for Blooto, Mentikan, Kranggan | Supporting statistics only; not direct puskesmas counts |
| `P2` | [Kecamatan Magersari Dalam Angka 2024](https://mojokertokota.bps.go.id/id/publication/2024/09/26/a0707fb4fd6cc7742fca5aea/kecamatan-magersari-dalam-angka-2024.html) | BPS Kota Mojokerto | Kecamatan | Context for Wates and Gedongan | Same rule: use for context, not for direct puskesmas comparison |
| `P2` | [Kecamatan Kranggan Dalam Angka 2024](https://mojokertokota.bps.go.id/id/publication/2024/09/26/72d84f69d281c1e05b8a51b8/kecamatan-kranggan-dalam-angka-2024.html) | BPS Kota Mojokerto | Kecamatan | Special case check for Kranggan naming and administrative context | Cross-check because the project currently places Kranggan under Prajuritkulon catchment |
| `P2` | [Puskesmas Blooto profile](https://puskesmasblooto.mojokertokota.go.id/halaman/profil) | Official puskesmas site | Puskesmas | Service list, profile, address, innovations | Trust for service profile; cross-check numeric tables elsewhere |
| `P2` | [Puskesmas Mentikan profile](https://puskesmasmentikan.mojokertokota.go.id/halaman/profil) | Official puskesmas site | Puskesmas | Service profile and narrative context | Useful for narrative but usually lighter on structured numbers |
| `P2` | [Puskesmas Wates profile](https://puskesmaswates.mojokertokota.go.id/halaman/profil) | Official puskesmas site | Puskesmas | Service profile and narrative context | Use for qualitative data first |
| `P2` | [Puskesmas Gedongan profile](https://puskesmasgedongan.mojokertokota.go.id/profil) | Official puskesmas site | Puskesmas | Service profile and local narrative | Verify carefully; parts of the site may be templated or uneven |
| `P2` | [Puskesmas Kranggan profile](https://puskesmaskranggan.mojokertokota.go.id/halaman/profil) | Official puskesmas site | Puskesmas | Current official identity and local scope | One of the strongest online sources for Kranggan because local parsed PDF is weak |
| `P2` | [IKM Puskesmas Kranggan Semester I 2025](https://puskesmaskranggan.mojokertokota.go.id/kegiatan/hasil-survey-indeks-kepuasan-puskesmas-kranggan-semester-1-tahun-2025-thu-sep-25-2025-000000-gmt0700) | Official puskesmas site | Puskesmas | Service quality and user satisfaction context | Good recent signal, but not a replacement for service volume or population data |
| `P3` | [Statistik Kesejahteraan Rakyat 2024](https://mojokertokota.bps.go.id/id/publication/2024/12/13/a69b88eff144e3a7280989af/statistik-kesejahteraan-rakyat-kota-mojokerto-2024.html) | BPS Kota Mojokerto | City | Welfare and household context | Best used for citywide benchmark and narrative framing |
| `P3` | [Profil Kemiskinan Kota Mojokerto Maret 2024](https://mojokertokota.bps.go.id/id/pressrelease/2024/11/22/91/profil-kemiskinan-kota-mojokerto-maret-2024.html) | BPS Kota Mojokerto | City | Poverty risk context | Supporting context for why a site may need intervention, not site-level proof |
| `P3` | [LKjIP Dinkes 2021](https://ppid.mojokertokota.go.id/userfiles/2022/08/26a88c5c165c468ac14d4dd5b86ff60a.pdf) | PPID Kota Mojokerto | Historical puskesmas references | Historical IKM and governance context | Useful for trend history only |
| `P3` | [Catatan atas laporan keuangan Dinkes 2022](https://ppid.mojokertokota.go.id/userfiles/2023/04/16b4d307404f116aad4a312921dfaa68.pdf) | PPID Kota Mojokerto | Historical finance context | BLUD and financial capacity context | Supporting operational context, not clinical ranking |

## Recommended Extraction Order

1. Build a clean `kelurahan -> puskesmas` reference table from the current dashboard mapping.
2. Pull the kelurahan population dataset and aggregate it into the five current puskesmas catchment areas.
3. Pull health datasets from Satikomo and classify them by level: city, kecamatan, kelurahan, or puskesmas.
4. Attach qualitative data from official puskesmas websites: profile, services, innovations, contact, and facility narrative.
5. Add BPS and PPID data only as supporting layers after the core health and demographic data are stable.

## Safe Integration Rules

- Prefer `kelurahan` level joins over `kecamatan` level joins whenever both exist.
- Never rank Blooto vs Mentikan directly from Prajuritkulon-level disease totals.
- Use official puskesmas websites for service descriptions, not as the first source for sensitive counts.
- Keep a field-level provenance record once new data is merged into the dashboard.
- Preserve the current dashboard as a curated layer until each imported field has been validated.

## Open Issues Before Dashboard Refresh

- Kranggan is still the weakest local profile in the current project and should be enriched first from official web sources.
- The current dashboard catchment map should be rechecked against the latest official service roster and coverage boundaries before a full numeric refresh.
- Some Satikomo dataset slugs are malformed, so download and inspect the actual file before automating ingestion.

## Suggested Next Deliverable

Create a new machine-readable file such as `output/ENRICHED_PUSKESMAS_DATA.json` with these sections:

- `catchment_map`
- `demography_by_kelurahan`
- `health_context_by_level`
- `puskesmas_profile_online`
- `field_provenance`
- `validation_flags`
