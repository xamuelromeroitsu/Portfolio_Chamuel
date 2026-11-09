# Alcance futuro del panel de administración

Este documento define una evolución posible para gestionar el portafolio desde un panel privado, sin editar archivos y desplegar el sitio cada vez. **Es una propuesta de alcance: el panel y sus funciones aún no están implementados.**

## Objetivo

Crear un CMS pequeño, privado y mantenible para que el propietario pueda actualizar el contenido que cambia con frecuencia, conservando el diseño, la estructura y el rendimiento del portafolio público.

La implementación debe ser incremental. No conviene construir todas las herramientas a la vez: cada módulo debe tener permisos, validación, pruebas y una forma segura de corregir o retirar cambios.

## Fases propuestas

### Fase 1: administración de recomendaciones

Primera versión del panel, basada en el flujo descrito en [testimonios-readme.md](./testimonios-readme.md):

- Iniciar y cerrar sesión del propietario.
- Crear enlaces privados de invitación, copiar, revocar y consultar si están usados o vencidos.
- Revisar recomendaciones recibidas y publicar, rechazar, retirar o eliminar.
- Mostrar públicamente solo las recomendaciones aprobadas y los datos autorizados.

Esta fase establece la autenticación, el modelo de permisos y la conexión segura con Supabase. Se recomienda probarla antes de agregar más contenido editable.

### Fase 2: proyectos y trabajos

- Crear, editar, archivar y eliminar proyectos.
- Editar título, descripción, tecnologías, enlaces e imágenes.
- Controlar si un proyecto aparece destacado en Inicio y su orden.
- Validar que las imágenes cumplan tamaño y formato permitidos y que los enlaces sean válidos.
- Mantener una vista previa antes de publicar los cambios.

Los proyectos actualmente están en el catálogo local `src/data/projects.js`. Migrarlos al panel requiere definir cómo importar el contenido existente y cómo almacenar las imágenes; no debe asumirse que basta con conectar un formulario a la base de datos.

### Fase 3: perfil y experiencia

- Actualizar presentación, cargo, habilidades y experiencia.
- Editar los datos de contacto y enlaces sociales.
- Conservar campos neutrales para los datos y traducciones separadas para es/en/pt.
- Previsualizar cada idioma y avisar cuando falte una traducción.

No se deben permitir cambios de código, HTML arbitrario o scripts desde el editor. Los campos editables deben ser específicos y validados.

### Fase 4: documentos y contenido adicional

- Reemplazar versiones del CV y documentos descargables por idioma.
- Editar metadatos públicos: título, descripción y enlaces sociales.
- Gestionar artículos o entradas de blog solo si el sitio incorpora una sección de publicaciones.

El panel no debe almacenar archivos ejecutables. Los tipos y tamaños permitidos, el acceso a los archivos y la política para versiones anteriores deben definirse antes de implementar cargas.

### Fase 5: mensajes de contacto (opcional)

Actualmente el formulario envía mensajes mediante EmailJS y no los guarda en una base de datos. Para administrarlos desde el panel, primero se debe elegir e implementar un servicio de recepción y almacenamiento con retención y protección de datos definidas. Después podrían añadirse estados como nuevo, respondido y archivado.

No se recomienda guardar mensajes personales solo por comodidad si basta con recibirlos en el correo. Si se implementa esta fase, debe informar al remitente cómo se usarán y conservarán sus datos.

## Mapa de navegación posible

Todas las rutas del panel conservan el prefijo de idioma que usa el sitio:

| Ruta | Acceso | Función |
|---|---|---|
| `/:lang/admin/login` | Público | Acceso del propietario |
| `/:lang/admin` | Propietario autenticado | Resumen y accesos rápidos |
| `/:lang/admin/testimonials` | Propietario autenticado | Invitaciones y recomendaciones |
| `/:lang/admin/projects` | Propietario autenticado | Catálogo de proyectos |
| `/:lang/admin/profile` | Propietario autenticado | Perfil, habilidades y experiencia |
| `/:lang/admin/documents` | Propietario autenticado | CV y documentos |
| `/:lang/admin/settings` | Propietario autenticado | Preferencias de publicación y cuenta |

Las rutas para editar una entidad se pueden añadir cuando haga falta, por ejemplo `/:lang/admin/projects/:id`. El inicio de sesión no debe aparecer en el menú público principal; puede mantenerse como ruta directa o como enlace secundario discreto en el pie. La discreción de un enlace no es una medida de seguridad: cada operación debe autorizarse también en el backend.

## Distribución de responsabilidades

- **Sitio público:** muestra contenido publicado, solicita recomendaciones y ofrece contacto.
- **Panel React:** presenta formularios, listas, vista previa y estados; no determina por sí solo quién está autorizado.
- **Supabase Auth:** administra la sesión del propietario.
- **Supabase Postgres y RLS:** almacenan los registros y restringen lecturas y escrituras.
- **Edge Functions:** realizan acciones privilegiadas y validan identidad, rol y entradas en el servidor.
- **Almacenamiento de objetos:** guarda imágenes y documentos si se habilitan cargas; debe usar políticas de acceso y validación propias.

El frontend solo recibe credenciales públicas. La clave `service_role` y cualquier secreto permanecen en variables privadas del servidor y no deben llevar prefijo `VITE_`.

## Reglas comunes de seguridad y publicación

1. Crear solo la cuenta del propietario; mantener deshabilitado el registro público de administradores.
2. Comprobar sesión y permisos en el backend para cada operación de lectura o escritura privada. Proteger una ruta en React no reemplaza esta autorización.
3. Activar RLS en cada tabla con acceso desde el cliente y probar las políticas como `anon` y como usuario autenticado.
4. Validar en servidor los datos, formatos, tamaños, enlaces y transiciones permitidas; no confiar en la validación del navegador.
5. Separar contenido en borrador de contenido publicado. Los cambios requieren una acción explícita de publicación y deben poder retirarse.
6. Exponer al público únicamente los campos necesarios; excluir correos privados, notas administrativas, tokens y estados internos.
7. Registrar los cambios administrativos importantes sin guardar contraseñas, tokens ni contenido sensible innecesario.
8. Definir copias de seguridad y una forma documentada de recuperar contenido eliminado o una publicación incorrecta.
9. Limitar solicitudes y cargas para reducir abuso; mostrar errores claros sin revelar secretos ni detalles internos.
10. Documentar la retención y eliminación de datos personales, incluyendo solicitudes de borrado.

## Funciones que quedan fuera del alcance inicial

- Múltiples roles de editor, flujos de aprobación entre personas o permisos por proyecto.
- Analítica avanzada, CRM, campañas de correo y mensajería integrada.
- Edición visual libre de páginas o inserción de HTML/CSS/JavaScript.
- Publicación programada, versiones complejas o localización automática.
- Gestión de clientes, facturación o datos contractuales.

Se pueden reevaluar cuando exista una necesidad concreta; incluirlas al principio aumenta la superficie de seguridad y el mantenimiento.

## Criterios para incorporar un módulo

Antes de comenzar una fase, definir:

- Qué campos puede administrar y cuáles son públicos o privados.
- Quién puede ver, crear, editar, publicar y eliminar.
- Cómo validar, previsualizar, revertir y probar los cambios.
- Si requiere nuevos datos personales, archivos o servicios externos.
- Cómo se migrará el contenido actual y cómo se recuperará ante un error.
- Qué traducciones deben existir en español, inglés y portugués.

Una fase está lista para producción cuando las rutas directas y las acciones se han probado con y sin sesión, RLS impide accesos no autorizados, el build y las pruebas pasan, y existe una forma verificada de retirar o recuperar publicaciones.

## Orden recomendado

1. Implementar y validar autenticación, RLS y recomendaciones.
2. Añadir proyectos con vista previa y publicación explícita.
3. Incorporar perfil y experiencia con soporte completo para los tres idiomas.
4. Gestionar CV y archivos si la actualización frecuente lo justifica.
5. Considerar almacenar mensajes de contacto solo después de definir su tratamiento y retención.

El documento de recomendaciones contiene el diseño detallado para la primera fase: [docs/testimonios-readme.md](./testimonios-readme.md).
