export class Envs {
    static apiUrl: string = import.meta.env.VITE_API_URL

    static validate() {
        const errors = []
        for (const key of Object.keys(this)) {
            if (!Boolean(this[key as keyof typeof this])) {
                  errors.push(key)
            }
        }
        if (errors.length > 0) {
            throw new Error("Some environmental variables arent set:\n" + errors.join('\n'))
        }
    }
}

Envs.validate()