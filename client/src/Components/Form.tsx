import { useForm } from "react-hook-form";

type FormProps = {
    onSubmit: any
}


function Form({ onSubmit }: FormProps) {
    const { register, handleSubmit } = useForm();
    return (
        <>
            <div className="card mb-16 mx-auto w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                            <input placeholder="Žodis" className="input mx-auto input-bordered w-full max-w-xs mb-4" type="text" {...register("searchWord", {})} />
                            <button className="btn mx-auto  btn-wide" type="submit">Ieškoti</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Form;