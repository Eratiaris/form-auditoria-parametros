# 📱 Cómo instalar la App de Auditoría — Allegion Planta Tecate

La página de auditoría se puede **instalar como app** en el celular o tablet de los operarios. Queda con ícono propio, abre sin barra de navegador, y funciona incluso si se cae el internet momentáneamente.

---

## Antes de instalar: subir los archivos a GitHub

En el repositorio `form-auditoria-parametros` deben estar **3 archivos**:
- `index.html`
- `manifest.json`
- `service-worker.js`

(Arrastra los 3 al repo → Commit. GitHub Pages los publica en 1-2 min.)

---

## Instalar en Android (Chrome)

1. Abre en Chrome: `https://eratiaris.github.io/form-auditoria-parametros/`
2. Inicia sesión una vez (para que quede lista)
3. Toca el menú **⋮** (arriba a la derecha)
4. Toca **"Agregar a pantalla de inicio"** o **"Instalar app"**
5. Confirma → aparece el ícono de Auditoría en la pantalla de inicio

## Instalar en iPhone/iPad (Safari)

1. Abre en **Safari** (importante, no Chrome): la misma URL
2. Toca el botón **Compartir** (cuadro con flecha ↑)
3. Baja y toca **"Agregar a inicio"** / "Add to Home Screen"
4. Toca **"Agregar"** → aparece el ícono

---

## Qué gana el operario con la app instalada

- ✅ **Ícono propio** de Auditoría (clipboard azul Allegion) — distinto a otras apps
- ✅ **Abre a pantalla completa**, sin barra de navegador
- ✅ **Abre aunque no haya internet** (la app queda guardada en el dispositivo)
- ✅ **Captura sin conexión**: si se cae el wifi al guardar, la auditoría se guarda local y se sube sola cuando vuelve el internet
- ✅ Arranca más rápido

## Limitaciones honestas (por si preguntan)

- El **inicio de sesión** sí necesita internet (la primera vez y cada ~1 hora que caduca la sesión). Capturar y guardar sí funcionan offline.
- Requiere que el dispositivo tenga cuenta Microsoft del tenant con permiso de escritura en la lista.

---

## Actualizar la app

Cuando cambie el `index.html`, súbelo de nuevo a GitHub. Los dispositivos toman la nueva versión al reabrir la app con internet (puede tardar una apertura o dos por el caché). Para forzar: cerrar y reabrir la app 2 veces con wifi.
