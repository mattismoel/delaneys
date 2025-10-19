import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeeForm, type Employee } from "../employee"
import type z from "zod"
import Input from "../../../lib/components/input"
import AvatarSelector from "../../../lib/components/avatar-selector"
import { Button } from "../../../lib/components/button"
import ErroneousField from "../../../lib/components/erroneous-field"
import { LuLoader, LuLoaderCircle } from "react-icons/lu"

type Props = {
	employee?: Employee
	onSubmit: (form: z.infer<typeof employeeForm>) => void;
	submitting: boolean;
}

const EmployeeForm = ({ employee, submitting, onSubmit }: Props) => {
	const { control, formState: { errors }, register, handleSubmit } = useForm({
		defaultValues: employee ? { ...employee } : undefined,
		resolver: zodResolver(employeeForm)
	})

	return (
		<form className="w-full flex flex-col items-center gap-8" onSubmit={handleSubmit(onSubmit)}>
			<ErroneousField error={errors.image?.message}>
				<Controller
					control={control}
					name="image"
					render={({ field }) => (
						<AvatarSelector
							onChange={field.onChange}
							buttonText={field.value ? "Ændr..." : "Vælg..."}
							src={field.value ? URL.createObjectURL(field.value) : employee?.imageSrc ?? undefined}
						/>
					)}
				/>
			</ErroneousField>

			<fieldset className="flex flex-col gap-2">
				<ErroneousField error={errors.name?.message}>
					<Input placeholder="Navn" {...register("name")} />
				</ErroneousField>

				<ErroneousField error={errors.role?.message}>
					<Input placeholder="Rolle" {...register("role")} />
				</ErroneousField>
			</fieldset>

			<Button className="w-full">
				{submitting ? (
					<LuLoaderCircle className="animate-spin" />
				) : (
					employee ? "Redigér" : "Tilføj"
				)}
			</Button>
		</form >
	)
}

export default EmployeeForm
