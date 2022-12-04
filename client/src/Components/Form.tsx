import { useForm } from "react-hook-form";

type FormProps = {
    onSubmit: any
}


function Form({ onSubmit }: FormProps) {
    const { register, handleSubmit } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <select defaultValue="noun" {...register("searchWordType", {})}>
                    <option value="noun">Daiktavardis</option>
                    <option value="adjective">Būdvardis</option>
                </select>
            </div>
            <div>
                <input type="text" placeholder="Žodis" {...register("searchWord", {})} />
            </div>
            <input type="submit" />
        </form>
    )
}

export default Form;