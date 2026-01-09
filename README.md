# Landing - Desarrollos UX UI (Bootstrap 5.x)

## Nota sobre Bootstrap
Bootstrap 5.3.x 

## Estructura del proyecto
```
MBGroup/
|
├─ MBClub/
│  ├─ MB-Plataforma/
│  ├─ LoginMB/
│  ├─ MBClub-Web/
│  └─ Website/
├─ MBUIKit/
│  ├─ index.html
│  ├─ assets/
│  └─ botones_bootstrap/
└─ Maktub/
   ├─ Assets/
   ├─ CrearCuenta/
   └─ WebSite/
```
- `index.html` y `assets/` contienen la landing principal (Bootstrap 5.3.x).
- `MBClub/`, `MBUIKit/` y `Maktub/` agrupan proyectos independientes con su propio HTML/CSS/JS.
- `assets/img/reference.jpeg` es la imagen de referencia adjunta.

## Personalización
- Reemplaza los `src` de cada <img> dentro de los botones por tus logotipos.
- Ajusta colores en `:root` dentro de `assets/css/styles.css`:
  - --c-cyan: #00A1E0
  - --c-blue: #1C73B8
- Colores utilizados en los proyectos (variables principales):
  - Landing principal (`assets/css/styles.css`): #00A1E0, #1C73B8, #000000, #06070b, #0a0f1a.
  - MBClub Plataforma (`MBClub/MB-Plataforma/mb-style.css`): #0d6efd, #00A1E0, #0b1120, #f8fafc.
  - MBClub Website (`MBClub/Website/styles.css`): #1c73b8, #EC221F, #05080f, #f8fafc.
  - MBClub Login (`MBClub/LoginMB/css/base.css`): #0073BC, #3ba4ff, #02040a.
  - MBUIKit (`MBUIKit/assets/css/styles.css`): #1C73B8, #7AB8EB, #020617.
  - Maktub WebSite (`Maktub/WebSite/css/stylemk.css`): #2290FF, #0e1522.
  - Maktub CrearCuenta (`Maktub/CrearCuenta/assets/css/styles.css`): #00A1E0, #1C73B8, #0f172a, #ffffff.

## Publicación
  __  __ ____     _____ _____   ____   ____  _    _ _____  
 |  \/  |  _ \   / ____|  __ \ / __ \ / __ \| |  | |  __ \ 
 | \  / | |_) | | |  __| |__) | |  | | |  | | |  | | |__) |
 | |\/| |  _ <  | | |_ |  _  /| |  | | |  | | |  | |  ___/ 
 | |  | | |_) | | |__| | | \ \| |__| | |__| | |__| | |     
 |_|  |_|____/   \_____|_|  \_\\____/ \____/ \____/|_|     
                                                           
                                                           
