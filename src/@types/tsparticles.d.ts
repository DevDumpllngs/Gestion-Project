declare module "tsparticles" {
    export interface IParticlesOptions {
        [key: string]: unknown; // Permite cualquier propiedad con valor desconocido
    }

    export function loadParticles(containerId: string, options: IParticlesOptions): void;
    export function loadFull(containerId: string, options: IParticlesOptions): void; // Agregando la declaración de loadFull
}
