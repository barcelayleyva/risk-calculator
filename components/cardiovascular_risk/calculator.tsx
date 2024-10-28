"use client"
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormLabel, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { cardioRiskCalculator } from '@/lib/utils/useRiskCalculator';
import { CardioRiskResultType } from '@/types/riskResult.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { FormDataType, FormSchema } from "@/components/cardiovascular_risk/formSchemas";
 type Props = {
   onCalculateRisk: (result: CardioRiskResultType) => void
 }
export default function CardiovascularRiskCalculator({ onCalculateRisk }: Props) { 

  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      age: 18,
      cholesterol: undefined,
      systolic: undefined,
      smoking: undefined,
      diabetes: undefined,
      sex: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormDataType> = (data: FormDataType): void => { 
    const { risk } = cardioRiskCalculator(data);       
    const result: CardioRiskResultType = {
      risk,
      data: {
        fullName: data.fullName,
        diabetes: data.diabetes,
        smoking: data.smoking,
        cholesterol: data.cholesterol,
        systolic: data.systolic,
      },
    }
    onCalculateRisk(result); 
  };

  
  
    return (
      <>
        <section className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">¿Conoces tu riesgo cardiovascular?</h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Mediante esta sencilla herramienta podrás descubrirlo de forma rápida y recibir una serie de recomendaciones básicas
                para que empieces a mejorarlo desde ahora mismo.            
              </p>
        </section>
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="bg-white p-6 md:p-8 shadow-lg lg:w-1/3 h-fit">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Evaluación Rápida</h3>
            <p className="text-gray-700">
              Bastan unos <span className="font-bold">datos básicos</span> (<span className='italic'>edad, peso, sexo</span>) y una <span className="font-bold">información concisa</span> sobre tus <span className="font-bold">hábitos de vida</span> (<span className="italic">tabaquismo, colesterol, diabetes, tensión alta</span>) para descubrir si la probabilidad de que padezcas una dolencia de corazón es <span className="font-bold italic">baja</span>, <span className="font-bold italic">media</span> o <span className="font-bold italic">alta</span>. <span className="font-bold">No esperes más tiempo</span> para conocer tu estado de salud y, si lo necesitas, poner en marcha un plan para mejorarlo cuanto antes. <span className="font-bold">Entra y conoce tu riesgo cardiovascular</span>.
            </p>
          </Card>

          <Card className="bg-white p-6 md:p-8 shadow-lg lg:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Evalúa tu Riesgo Cardiovascular</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese su nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Edad</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cholesterol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Colesterol total(mg/dL)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value, 10))}
                            className="appearance-none"
                          />
                        </FormControl>                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hdl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HDL(mg/dL)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value, 10))}
                            className="appearance-none"
                          />
                        </FormControl>                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="systolic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tensión sistólica(mmHg)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value, 10))}
                            className="appearance-none"
                          />
                        </FormControl>                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="smoking"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Tabaquismo</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Sí
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diabetes"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Diabetes</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Sí
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Sexo</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="male" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Masculino
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="female" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Femenino
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                  Calcular Riesgo Cardiovascular
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </>
    );
}