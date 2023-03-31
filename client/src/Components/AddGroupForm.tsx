import { useFieldArray, useForm } from "react-hook-form";
import { Group, GroupRequest } from "../Types";
import GroupService from "../Services/GroupService";

type AddGroupFormProps = {
  authId: string;
  setGroups: (group: Group[]) => void;
  onSucess: () => void;
};

export default function AddGroupForm({
  setGroups,
  authId,
  onSucess,
}: AddGroupFormProps) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      children: [{ firstName: "", lastName: "", age: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const onSubmit = (data: any) => {
    const submitData: GroupRequest = {
      ...data,
      authId: authId,
    };

    GroupService.createGroup(submitData).then(
      async () =>
        await GroupService.getAllGroupsByAuthId(authId).then((res) => {
          setGroups(res);
          onSucess();
        })
    );
  };
  return (
    <>
      <div className="card mb-16 mx-auto w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <h1 className="text-center text-1xl font-bold mt-0 mb-6">
                Grupės informacija
              </h1>
              <input
                placeholder="Pavadinimas"
                className="input mx-auto input-bordered w-full max-w-xs mb-4"
                type="text"
                {...register("name", {})}
              />
              <ul>
                {fields.map((item, index) => {
                  return (
                    <>
                      <h1 className="text-center text-1xl font-bold mt-0 mb-6">
                        {index + 1} vaikas{" "}
                      </h1>
                      <li key={item.id}>
                        <input
                          placeholder="Vardas"
                          type="text"
                          className="input mx-auto input-bordered w-full max-w-xs mb-4"
                          {...register(`children.${index}.firstName`, {
                            required: true,
                          })}
                        />
                        <input
                          placeholder="Pavardė"
                          type="text"
                          className="input mx-auto input-bordered w-full max-w-xs mb-4"
                          {...register(`children.${index}.lastName`, {
                            required: true,
                          })}
                        />
                        <input
                          placeholder="Amžius"
                          type="number"
                          className="input mx-auto input-bordered w-full max-w-xs mb-4"
                          {...register(`children.${index}.age`, {
                            required: true,
                          })}
                        />
                        <button
                          className="btn btn-secondary btn-outline mx-auto w-full btn-wide mb-4"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Panaikinti
                        </button>
                      </li>
                    </>
                  );
                })}
              </ul>
              <button
                className="btn btn-secondary mx-auto w-full btn-wide mb-4"
                type="button"
                onClick={() => {
                  append({ firstName: "", lastName: "", age: 0 });
                }}
              >
                Pridėti vaiką
              </button>
              <button
                className="btn btn-primary mx-auto w-full btn-wide mb-4"
                type="submit"
              >
                Sukurti grupę
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
