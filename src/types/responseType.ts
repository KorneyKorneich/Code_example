export interface ResponseType {
    status: 'success' | 'error'
    fields?:{
        name?: string
        email?: string
        phone?: string
        msg?: string
    }
    message?: string
}
