# LMR Seasonal research page

Public route: `https://zilum.github.io/lmr-seasonal/` after deployment.
This is a static page; it needs no build step. All scientific text and resource
links are present in the HTML, including without JavaScript.

## Page structure for other research projects

1. Full paper title, authors, publication, and primary resource links.
2. Research question and a concise account of the contribution.
3. Selected findings with genuine paper figures, readable captions, and source anchors.
4. Method and validation explained in text.
5. Data specifications, access, and a verified use example, when data exist.
6. Verified examples of independent research uses, with specific citation contexts.
7. Scientific scope and limitations.
8. Published abstract, paper/data/code citation guidance, and downloadable BibTeX.

Copy this structure for another work, then replace all page-specific content,
figures, metadata, IDs, licenses, and resource URLs. Add the new route to the
homepage and sitemap. Use the correct status for preprints and published papers.

## Sources and checks

- Published paper: `../paper/clim-JCLI-D-25-0048.1-2.pdf`.
- DOI: <https://doi.org/10.1175/JCLI-D-25-0048.1>.
- Crossref record confirmed 2025-12-01, volume 38, issue 23, pages 7229–7247.
- Data archive: <https://zenodo.org/records/17268597>.
- Data portal: <https://atmos.uw.edu/~zilumeng/LMR_Seasonal/index.html>.
- Data guide: <https://atmos.uw.edu/~zilumeng/LMR_Seasonal/quickstart.html>.
- Code: <https://github.com/ZiluM/LMR_Seasonal>.

The published dataset covers **800–2000 CE**, confirmed in the Zenodo record
and actual NetCDF time coordinates. **850–1850 CE** is the period used for
the paper's seasonal-trend comparison, not the full downloadable data range.
NetCDF metadata confirmed 800 members, global 90 × 180 fields, and Northern
Hemisphere 45 × 180 sea ice fields. January/April/July/October labels represent
DJF/MAM/JJA/SON. Index files use dimensions `(time, ens_num)`.

The anomaly baseline is explicitly attributed to the data portal. Dataset and
code licenses are distinct. The page does not assign either license to the
published paper or its figures.

Figure assets were extracted from the paper's embedded figures: Figure 4 on PDF
page 6, Figure 10 on page 12, and Figure 14 on page 16. The published abstract
is displayed at the top of the page alongside the title and authors.

`paper.pdf` is a lightweight edition of the existing published PDF, below
Google Scholar's 5 MB file limit and in the same directory as the abstract page.
Ghostscript compression uses 300 dpi color/grayscale images and JPEG quality 90.
All 19 pages and searchable text were retained and compared with the source.
The original-resolution PDF remains available through a separate link. When
updating the paper, regenerate and verify the lightweight edition.

## Maintenance

### Research-use examples

Selected published studies were checked against primary article text on
4 October 2026. These examples are not a complete citation list or a citation
count. Each cites the final LMR Seasonal paper DOI.

- Sjolte & Tao (2026), *Climate of the Past*, 22, 915–933:
  <https://cp.copernicus.org/articles/22/915/2026/>. Sections 2.3 and 3.5 compare
  LMR Seasonal summer/winter temperature with the North Atlantic reconstruction;
  Figs. 8 and 11 document spatial and time-dependent comparisons. Distinguish
  these seasonal comparisons from the same paper's annual LMR v2.1 comparisons.
- Dilawar et al. (2026), *Scientific Data*, 13, 687:
  <https://www.nature.com/articles/s41597-026-06959-0#Sec21>. Technical Validation,
  Fig. 7, and reference 75 compare the new Yangtze summer temperature product
  with LMR Seasonal (the text links the dataset archive). LMR is a validation
  comparator, not one of the four input datasets used to generate the product.
- Chen et al. (2026), *Nature Communications*, 17, 3234:
  <https://www.nature.com/articles/s41467-026-70049-3#Sec9>. Climate forcing
  methods, Fig. 1a, and reference 37 use reconstructions including LMR Seasonal
  to assess Chinese temperature simulations. Do not describe LMR Seasonal as
  the direct forcing for the carbon model; that forcing comes from adjusted
  climate-model output.
- Lin et al. (2026), *Journal of Advances in Modeling Earth Systems*, 18(7),
  e2026MS005767: <https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2026MS005767>.
  Section 2.1.1 cites Meng et al. for 15-PC truncation and treatment of negative
  noise-covariance eigenvalues. This is methodological reuse; it does not
  establish use of the published LMR Seasonal dataset.

### Citation guidance

The downloadable BibTeX includes the final journal article and the v1
ensemble-mean data archive. For UW index/member files, the page asks readers
to record the portal, filenames, and access date. For code, it recommends
the paper plus the repository and exact version/commit; no software DOI is
invented.

### General checks

Keep visible citations, `citation_*` tags, JSON-LD, and `citation.bib` in sync.
Update figure captions and limitations when scientific content changes.
Check local paths, live resource links, and desktop/mobile rendering before
deploying. Crawling eligibility and structured metadata do not guarantee an
AI search citation.

The root-level 32-character `.txt` key enables IndexNow ownership verification.
After public page updates, send only changed URLs to the official IndexNow
endpoint after confirming the key is live. A successful submission is not
confirmation of indexing. Keep the key file available for later updates.
