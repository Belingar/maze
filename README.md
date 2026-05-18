# 🎮 Igra Labirint (Maze Game)

Dobrodošli v repozitoriju **Maze Game**! To je interaktivna 2D igra, namenjena zabavi in prikazu delovanja algoritmov za generiranje ter reševanje labirintov.

---

## 📝 O igri (Kaj je to za ena igra?)

**Maze Game** je klasična ugankarska igra, v kateri se igralec preizkusi v iskanju poti skozi naključno ustvarjen labirint. Glavni cilj igre je voditi lik od začetne točke (vhod) do končne točke (izhod oz. zaklad). 

Posebnost igre je, da se labirint ob vsakem novem zagonu ali uspešno opravljeni stopnji **proceduralno generira znova**. To pomeni, da je vsak labirint unikatna uganka z natanko eno pravilno rešitvijo, brez zaprtih zank ali slepih hodnikov, iz katerih se ne bi dalo priti.

---

## 🛠️ Tehnologije in orodja (Kaj je bilo uporabljeno za zgradnjo?)

Za razvoj te igre so bile uporabljene naslednje tehnologije:

- **Programski jezik:** [Python 3.x](https://www.python.org/) – izbran zaradi svoje preglednosti in odlične podpore za učenje algoritmov.
- **Grafična knjižnica:** [Pygame](https://www.pygame.org/) – uporabljena za izrisovanje (renderiranje) 2D grafike, upravljanje igralne zanke, zaznavanje vnosov s tipkovnice ter osveževanje zaslona.
- **Algoritmi:** - *Depth-First Search (DFS)* oz. iskanje v globino s povratnim sledenjem (Recursive Backtracking) za generiranje popolnih labirintov.
- **Razvojna orodja:** Git in GitHub za nadzor različic koda.

---

## 📂 Struktura map in datotek (Kako so datoteke postavljene?)

Projekt je organiziran čisto in modularno, kar ločuje programsko logiko od grafičnih elementov:

```text
maze/
│
├── assets/                 # Mapa za večpredstavnostne elemente
│   ├── images/             # Slike (lik igralca, tekstura sten, ciljna zastavica)
│   └── sounds/             # Zvočni učinki ob premikanju ali zmagi
│
├── src/                    # Glavna izvorna koda (Source Code)
│   ├── __init__.py         # Inicializacijska datoteka za Python pakete
│   ├── main.py             # Vstopna točka igre (zagon glavnega okna in zanke)
│   ├── maze_generator.py   # Algoritem in logika za generiranje labirinta
│   ├── player.py           # Razred za igralca (pozicija, premikanje, trki s stenami)
│   └── settings.py         # Nastavitve igre (velikost okna, barve, FPS, velikost celic)
│
├── .gitignore              # Datoteka, ki določa, katere datoteke naj Git prezre (npr. __pycache__/)
├── README.md               # Ta predstavitvena datoteka projekta
└── requirements.txt        # Seznam zunanjih knjižnic, potrebnih za delovanje (npr. pygame)
