// autobind decorator
export function autobind(_, _2, desciptor) {
    const originalMethod = desciptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
