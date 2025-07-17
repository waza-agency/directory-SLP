


## Reglas Generales de Desarrollo

1. **Simplicidad y Claridad**
   - Prioriza soluciones simples y directas.
   - Evita la complejidad innecesaria en la lógica y la estructura del código.
   - Prefiere scripts y componentes breves, enfocados y reutilizables.

2. **Refactorización Continua**
   - Refactoriza el código frecuentemente para mejorar legibilidad y mantenibilidad.
   - Elimina duplicidad y abstrae lógica común en utilidades o hooks.
   - Mantén los nombres de variables, funciones y componentes descriptivos y consistentes.

3. **Código Limpio y Legible**
   - Usa comentarios solo cuando sean estrictamente necesarios para clarificar intenciones.
   - Mantén la indentación y el formato consistente en todo el proyecto.
   - Elimina código muerto o no utilizado tan pronto como sea posible (previa aprobación si es necesario).

4. **Modularidad y Escalabilidad**
   - Divide la aplicación en componentes y módulos pequeños, independientes y reutilizables.
   - Separa la lógica de negocio de la presentación y de la gestión de estado.
   - Utiliza patrones de diseño apropiados para mantener la escalabilidad.
   - Mantén un máximo de 200 líneas por archivo/script para asegurar brevedad y enfoque.
   - Divide los scripts que excedan el límite en módulos más pequeños y específicos.

5. **Internacionalización y Responsividad**
   - Implementa internacionalización desde el inicio del proyecto.
   - Asegura que la aplicación sea completamente responsiva para dispositivos móviles y web.

6. **Pruebas y Calidad**
   - Implementa pruebas unitarias y de integración para cada parte del proyecto.
   - Mantén y mejora la cobertura de pruebas con cada cambio.
   - No uses datos mock; utiliza datos reales o entornos de prueba controlados.

7. **Documentación y Comunicación**
   - Documenta funciones, componentes y módulos con docstrings claros y concisos.
   - Mantén este documento actualizado con nuevas reglas o cambios en las prácticas de desarrollo.

8. **Gestión de Errores y Seguridad**
   - Implementa manejo de errores robusto y consistente en toda la aplicación.
   - Valida y sanitiza todas las entradas del usuario.
   - Protege la información sensible y sigue buenas prácticas de seguridad.

9. **Automatización y Scripts**
   - Utiliza scripts de automatización para tareas repetitivas (build, test, lint, etc.).
   - Mantén los scripts simples, claros y bien documentados.

10. **Revisión y Aprobación de Cambios**
    - Todo cambio significativo debe ser revisado antes de ser fusionado.
    - Solicita aprobación antes de eliminar archivos o funcionalidades.

    11. Cada vez que hagamos un cambio y sea exitoso quiero que realices un commit a github y que mantengas un log local de todos los cambios que vayamos commiteando. Los logs quiero que sean detallados para que sirvan de referencia si tenemos que regresar a un estado anterios del proyecto.

    12. Tambien quiero que creemos un log local en el que registremos todos los pasos y cambios que hemos ido realizando en el proyecto, la idea es que este log sirva como contexto para un coding agent y entienda el proyeco cada vez que se inicia una sesion.

---



