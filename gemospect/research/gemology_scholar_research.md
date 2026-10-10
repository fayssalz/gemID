# Gemmological Spectroscopy & Diffraction Grating Research Log

**Date / Timestamp**: 2025-05-18  
**Project**: Gemospect - Spectroscopy Gemology WebApp  
**Data Sources**: 
- Anderson & Payne (*The Spectroscope and Gemmology*, 280 text files in `./spectroscope_and_gemmology_book`)
- GIA (Gemological Institute of America) Scientific Literature & Laboratory Reports
- Journal of Gemmology & UV-Vis / FTIR / Raman / Photoluminescence Spectrophotometric Studies

---

## 1. Search Log & Executed Queries

| Query # | Search Query String | Purpose / Target Data |
| :--- | :--- | :--- |
| **Q1** | `gemmology spectroscopy absorption lines diffraction grating wavelengths GIA` | Diffraction grating principles, nm scales, chromophores in gems, GIA spectroscope standards. |
| **Q2** | `gemstone UV-Vis spectroscopy chromium iron rare earth absorption wavelengths table` | Quantitative absorption wavelengths ($Cr^{3+}, Fe^{2+}, Fe^{3+}, Co^{2+}, V^{3+}$, Rare Earth / REE didymium). |
| **Q3** | `text search: 112 gem species in spectroscope_and_gemmology_book/*.txt` | Extracting all 112 gem species, varieties, synthetics, and glasses from book text. |
| **Q4** | `FTIR spectroscopy gemology diamond emerald jadeite corundum treatment identification` | FTIR absorption bands for diamond types, resin/oil in emeralds, polymer in Grade-B Jadeite, and heat treatment in corundum. |
| **Q5** | `photoluminescence spectroscopy 77K diamond HPHT CVD 503nm 637nm 737nm 884nm GIA` | Cryogenic (77 K) PL ZPL (Zero Phonon Lines) for lab-grown CVD vs HPHT diamonds & radiation treatment centers. |
| **Q6** | `Raman spectroscopy gemology peaks jadeite nephrite zircon 1008 spinel 405 cm-1` | Raman vibrational mode fingerprints for Jadeite ($700, 1039\text{ cm}^{-1}$), Nephrite ($675, 1061\text{ cm}^{-1}$), Zircon ($1008\text{ cm}^{-1}$), and Spinel ($405\text{ cm}^{-1}$). |

---

## 2. Collected Scientific Intelligence (Proven & Documented Science)

### A. Chromophores & Key UV-Vis Absorption Mechanisms
1. **Chromium ($Cr^{3+}$)**:
   - **Fluorescence Doublet**: $693.5\text{ nm}$ (Ruby) / $683, 680\text{ nm}$ (Emerald) / $685\text{ nm}$ (Spinel organ-pipe lines).
   - **Yellow/Green Broad Absorption**: $550 - 620\text{ nm}$ due to $d-d$ orbital crystal field transitions ($^{4}A_{2g} \rightarrow {}^{4}T_{2g}$).
   - **Blue/Violet Lines**: $476, 468\text{ nm}$ (Ruby), $477\text{ nm}$ (Emerald), $475\text{ nm}$ (Alexandrite).

2. **Ferrous Iron ($Fe^{2+}$)**:
   - **Almandine Garnet Triplet**: $504\text{ nm}$ (intense), $520\text{ nm}$, $573\text{ nm}$ (and minor lines at $610, 680\text{ nm}$).
   - **Peridot / Olivine Trio**: $493\text{ nm}$, $473\text{ nm}$, $453\text{ nm}$ in blue/violet region.
   - **Enstatite / Diopside**: Strong line at $506\text{ nm}$ (Enstatite) or double line $505/508\text{ nm}$ (Diopside).

3. **Ferric Iron ($Fe^{3+}$)**:
   - **Sapphire Triplet**: $450\text{ nm}$ (strongest), $460\text{ nm}$, $471\text{ nm}$ (distinguishes natural blue sapphire from synthetic).
   - **Demantoid Garnet & Andradite**: Intense violet cutoff below $443\text{ nm}$ due to $Fe^{3+}$.
   - **Jadeite**: Diagnostic $437.5\text{ nm}$ ferric line.

4. **Cobalt ($Co^{2+}$)**:
   - **Natural & Synthetic Blue Spinel**: Triple band at $458, 478, 500\text{ nm}$ (natural) or $635, 580, 540\text{ nm}$ (synthetic).
   - **Cobalt Glass**: $656, 589, 534\text{ nm}$ (central band narrower than synthetic spinel).

5. **Manganese ($Mn^{2+} / Mn^{3+}$)**:
   - **Spessartite Garnet**: $485\text{ nm}, 461\text{ nm}$.
   - **Rubellite / Red Tourmaline**: $525\text{ nm}$ broad band with $537\text{ nm}$ fine line.
   - **Rhodonite / Rhodochrosite**: $545 - 550\text{ nm}$ green absorption.

6. **Rare Earth Elements (REE / Didymium - $Nd^{3+}, Pr^{3+}$)**:
   - **Apatite, Sphene, Scheelite, Monazite, Didymium Glass**: Extremely sharp "comb-like" line group in yellow around $584\text{ nm}$ and $572\text{ nm}$.

7. **Nitrogen Aggregates & Radiation Color Centers in Diamond**:
   - **Cape Line**: $415.5\text{ nm}$ ($N3$ center) in yellow/cape diamonds, accompanied by $478, 504\text{ nm}$.
   - **Irradiated Diamonds**: $594\text{ nm}$ ($H3$ center) and $694\text{ nm}$ artificial radiation lines.

---

## 3. Fourier-Transform Infrared (FTIR) Spectroscopy Diagnostics

| Gemstone Family | Diagnostic Wave Number ($\text{cm}^{-1}$) | Scientific Origin & Indicated Treatment / Classification |
| :--- | :--- | :--- |
| **Diamond** | $1000 - 1450\text{ cm}^{-1}$ | Nitrogen aggregation states (Type IaA, IaB vs Type Ib / Type IIa/IIb). |
| **Diamond** | $3107\text{ cm}^{-1}$ | $V-N_3-H$ hydrogen complex in natural untreated diamonds. |
| **Emerald** | $2800 - 3100\text{ cm}^{-1}$ | $C-H$ stretching vibrations of clarity enhancements (Cedarwood oil vs Epoxy/Opticon resins). |
| **Jadeite** | $2850 - 3060\text{ cm}^{-1}$ | **B-Jade Verification**: Polymer resin impregnation ($3040, 3061\text{ cm}^{-1}$) vs Waxing ($2850, 2920, 2965\text{ cm}^{-1}$). |
| **Corundum** | $3310\text{ cm}^{-1}$ | $O-H$ stretching mode of hydroxyl groups. Disappears or decreases upon high-temperature annealing ($>1200^\circ\text{C}$). |

---

## 4. Cryogenic Photoluminescence (PL at 77 K) Zero-Phonon Lines (ZPL)

| Peak Wavelength ($\text{nm}$) | Defect Center / Origin | Diagnostic Significance |
| :--- | :--- | :--- |
| **736.6 / 736.9 nm** | $[Si-V]^{-}$ (Silicon Vacancy) | Diagnostic for **CVD synthetic diamond** growth (silicon uptake from quartz reactor walls). |
| **637.0 nm** | $[N-V]^{-}$ (Nitrogen Vacancy) | Strong in HPHT-treated diamonds and CVD synthetics. |
| **503.2 nm** | $H3$ ($N-V-N$ complex) | Formed during HPHT treatment and annealing of nitrogen-bearing brown diamonds. |
| **882 / 884 nm** | $[Ni-V]$ (Nickel Vacancies) | Diagnostic for **HPHT synthetic diamond** grown using nickel solvent catalysts. |
| **741.2 nm** | $GR1$ (General Radiation 1) | Neutral vacancy center created by electron/particle irradiation. |

---

## 5. Raman Vibrational Mode Fingerprints

| Mineral / Gem | Key Raman Peaks ($\text{cm}^{-1}$) | Structural Vibrational Assignment |
| :--- | :--- | :--- |
| **Zircon (Crystalline)** | $1008, 439, 356\text{ cm}^{-1}$ | $1008\text{ cm}^{-1}$ ($\nu_3$ $SiO_4$ tetrahedra internal stretch). Broadens & shifts lower with metamictization (radiation damage). |
| **Jadeite** | $700, 1039, 375\text{ cm}^{-1}$ | $700\text{ cm}^{-1}$ (symmetric $Si-O-Si$ bending); $1039\text{ cm}^{-1}$ ($Si-O$ stretching in pyroxene chains). |
| **Nephrite** | $675, 1061, 3675\text{ cm}^{-1}$ | $675\text{ cm}^{-1}$ ($Si-O-Si$ double chain); $3675\text{ cm}^{-1}$ ($M-OH$ stretching for amphibole). |
| **Spinel (Mg-Al)** | $405, 310, 663, 764\text{ cm}^{-1}$ | $405\text{ cm}^{-1}$ ($E_g$ octahedral $Al-O$ vibration). Peak broadens in heat-treated/synthetic spinels due to order-disorder inversion. |

---

## 6. Full 112-Gem Taxonomy Extracted from 280 Text Files

The entire book dataset contains **112 distinct gem species, varieties, synthetics, and glasses**:
- **Corundum**: Ruby, Burma Ruby, Siam Ruby, Synthetic Ruby, Blue Sapphire, Green Sapphire, Yellow Sapphire, Purple Sapphire, Padparadscha, Synthetic Sapphire, Star Ruby/Sapphire.
- **Beryl**: Emerald (Colombian, Siberian, Chatham, Gilson, Lechleitner, Linde, Igmerald), Aquamarine, Maxixe Beryl, Green Beryl, Golden Beryl, Morganite, Bixbite (Red Beryl).
- **Spinel**: Red Spinel, Synthetic Red Spinel, Blue Spinel, Synthetic Blue Spinel, Gahnospinel.
- **Garnet Group**: Almandine, Pyrope, Spessartite/Spessartine, Demantoid, Andradite, Grossular, Hessonite, Tsavorite, Rhodolite, Uvarovite.
- **Zircon**: High Zircon, Low Zircon (Metamict), Burma Zircon, Sri Lankan Zircon, Anomalous Zircon, Heat-Treated Zircon.
- **Olivine / Borate**: Peridot, Sinhalite.
- **Pyroxene & Amphibole**: Jadeite, Nephrite, Maw-sit-sit, Chloromelanite, Enstatite, Hypersthene, Bronzite, Diopside, Chrome Diopside, Spodumene (Kunzite, Hiddenite, Triphane), Actinolite.
- **Tourmaline Group**: Green Tourmaline, Indicolite (Blue), Rubellite (Red), Chrome Tourmaline, Dravite, Verdelite.
- **Chrysoberyl**: Alexandrite, Synthetic Alexandrite, Chrysoberyl, Chrysoberyl Cat's-Eye.
- **Feldspar & Silicates**: Yellow Orthoclase, Sanidine, Moonstone, Amazonite, Labradorite, Sunstone, Andalusite, Fibrolite (Sillimanite), Kyanite, Iolite (Cordierite), Idocrase (Vesuvianite), Kornerupine, Axinite, Serpentine (Williamsite, Bowenite, Antigorite, Styrian Jade/Pseudophite).
- **Phosphate & Rare Earth Minerals**: Yellow Apatite, Blue Apatite, Green Apatite, Sphene (Titanite), Scheelite, Monazite, Turquoise, Variscite, Wardite, Brazilianite, Amblygonite.
- **Diamonds**: Cape Diamond, Type I & II Diamond, Yellow Diamond, Green Diamond, Brown Diamond, Pink Diamond, Irradiated Diamond, Blue Diamond.
- **Sulfides & Carbonates**: Sphalerite (Zinc Blende), Rhodonite, Rhodochrosite, Malachite, Azurite, Smithsonite.
- **Halides & Oxides**: Fluorspar (Fluorite), Cuprite, Cassiterite.
- **Synthetics & Simulants**: Synthetic Rutile, Fabulite (Strontium Titanate), YAG, GGG, Cubic Zirconia.
- **Colored Glasses**: Cobalt Glass, Didymium Glass, Selenium Glass, Uranium Glass, Crookes Glass, Gold Ruby Glass.
- **Rare Collector Gems**: Danburite, Scapolite, Sodalite, Lapis Lazuli, Ekanite, Euclase, Phenakite, Hambergite, Taaffeite, Pollucite, Wulfenite.

---

## 7. Next 10 High-Priority Research Queries for Future Gemology Info Hunts

1. `UV-Vis-NIR spectrophotometry charge transfer bands Fe2+-Ti4+ blue sapphire 880nm`
2. `GIA gemology FTIR database polymer resin absorption coefficients B-jadeite`
3. `Raman shift order-disorder cation inversion MgAl2O4 spinel 405 cm-1 FWHM`
4. `Cryogenic photoluminescence 77K SiV- 737nm doublet natural vs CVD diamond`
5. `Rare earth element 4f-4f transitions neodymium praseodymium apatite sphene scheelite`
6. `Beryl pleochroic E-ray vs O-ray absorption spectra aquamarine 810nm Fe2+-Fe3+`
7. `Demantoid garnet ferric iron Fe3+ 443nm band crystal field Dq/B calculation`
8. `Vanadium V3+ vs Chromium Cr3+ optical absorption band separation emerald tsavorite`
9. `Zircon 1008 cm-1 Raman peak FWHM vs metamict dose radiation damage scale`
10. `Infrared O-H stretching band 3310 cm-1 corundum heat treatment kinetics`
