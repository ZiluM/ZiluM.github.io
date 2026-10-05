# LMR Four-D / LMR4D-Var research page

Public route: <https://zilum.github.io/lmr-four-d/>.
Static HTML and CSS, matching the LMR Seasonal research-page design. Scientific
content, citations, and resource links are readable without JavaScript.

## Verified sources

- Version record: <https://arxiv.org/abs/2608.19469v2>.
- Full text: <https://arxiv.org/html/2608.19469v2>.
- Official original PDF: <https://arxiv.org/pdf/2608.19469v2>.
- DOI: <https://doi.org/10.48550/arXiv.2608.19469>.
- First submitted 19 August 2026; v2 revised 9 September 2026.
- Authors: Zilu Meng, Gregory J. Hakim, Julien Emile-Geay,
  Tanaya Gondhalekar, Eric J. Steig, in that order.
- Source review: 4 October 2026. Public sources did not establish a journal
  publication, acceptance, public reconstruction-output archive, or software DOI.

The complete abstract follows the **v2 PDF**, whose ocean-trend sentence is
absent from the shorter arXiv abstract-page text. Do not silently replace the
PDF abstract with the landing-page abstract.

## Scientific scope

The main P2k_BH_T12k analysis spans **500 BCE–2000 CE**. The seasonal analysis
has four steps per year. Its six state variables are surface air temperature,
SST, OHC at 0–300 m and 300–2000 m, and Northern Hemisphere sea ice
concentration and thickness. It does not include precipitation.

Five model-specific LIM priors are used for real-proxy experiments. A controlled
pseudo-proxy experiment excludes the entire CESM-LME family and uses four
remaining priors. Spread across the model-specific estimates does not represent
all reconstruction uncertainty. Figure 3 uses a nominal 90% inter-model-emulator
range, not a complete posterior credible interval.

OHC is indirectly constrained through the coupled emulator and predominantly
surface-sensitive proxies. The 130-year trend comparison uses 2,240 complete
historical windows within 500 BCE–1869 CE, compared with 1870–2000 CE.

The Holocene Temp12k-only experiment is a sensitivity test using a mainly
last-millennium-trained prior. Avoid advertising it as a fully validated
Holocene data product. Figure 8's calendar range and a duration statement in
the prose differ, so the page uses "Holocene-length" without a precise duration.

## Availability and attribution

The Open Research Statement at `#Sx5` identifies `ZiluM/4DVarLMR` as a private
development repository, planned for public release on publication. Public GitHub
access returned 404 during review. Do not link it as an available download,
invent an output-data DOI, or reuse the LMR Seasonal data-reading example.

Input-proxy resources are separate from reconstruction outputs:

- PAGES2k v2.0.0: <https://doi.org/10.6084/m9.figshare.c.3285353>.
- Temp12k: <https://www.ncei.noaa.gov/access/paleo-search/study/27330>.
- Boreholes / Xibalbá: <https://doi.org/10.6084/m9.figshare.13516487>.
- SACPY is an auxiliary public package: <https://github.com/ZiluM/sacpy>.

The preprint license is CC BY-NC-ND 4.0. Paper figures are reproduced intact
with source attribution; format/resolution changes do not change scientific
panels. Do not assign the preprint's license to future code or output datasets.

No independent downstream study was verified by this source review. The page
states the review result without claiming zero citations, and labels LMR
Seasonal as companion work. Do not copy Seasonal's citing studies here.

## Maintenance

Keep visible citations, `citation_*` tags, JSON-LD, `citation.bib`, and the PDF
version consistent. On publication, replace the preprint status and reference
only after verifying the journal metadata and data/code availability.

The local `paper.pdf` is a lightweight v2 PDF with all 42 pages and appended
supporting information. Its source file exceeds 5 MB; the lightweight edition
must stay below 5,000,000 bytes and retain searchable text and source links.

Figure assets: Fig. 1 (`coupled-method.webp`), Fig. 3 (`climate-history.webp`),
Fig. 5 (`ocean-warming.webp`), and Fig. 8 (`holocene-sensitivity.webp`). The
1000–2000 CE animation reuses the homepage asset and is labeled as illustrative.

Before deployment, verify anchors/resource paths, JSON-LD, exact BibTeX parity,
desktop and phone rendering, figure readability, PDF integrity, and crawl
eligibility. Add the route to the root sitemap and submit changed URLs through
IndexNow using the existing public verification key. Submission does not prove
indexing or AI citation.
