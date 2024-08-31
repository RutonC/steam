"use client";
import React, { useState } from "react";
import { Presentation, Computer, Cog } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import SideLeft from "@/components/side-left";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ModalPrivacy } from "@/components/modal-privacy";
import { useToast } from "@/components/ui/use-toast";
import { apiURL } from "@/lib/constants";

const createSendInfo = z.object({
  name: z.string().min(3, "Seu nome deve ser 3 caracteres no mínimo"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(new RegExp("^(84|85|87|86|83|82)[0-9]{0,7}/*$"), "Número inválido!"),
  address: z.string(),
  check: z.string(),
});

type CreateSendInfo = z.infer<typeof createSendInfo>;

function Subscription() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSendInfo>({
    resolver: zodResolver(createSendInfo),
  });

  const handleSend = async (values: CreateSendInfo) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiURL.base}/participant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
        }),
      });

      const data = await response.json();

      if (data.member) {
        toast({
          title: "Dados de Inscrição",
          description:
            "Seus dados de inscrição foram enviados com sucesso! Entraremos em contacto brevemente.",
        });

        fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_kunuj3r",
            template_id: "template_mboqt2i",
            user_id: "j4jq9L4NzPnJmcWUw",
            template_params: {
              from_name: "steam@comunika.co.mz",
              to_name: "inscricao@comunika.co.mz",
              message: `${values.name}, ${values.phone}, ${values.email}, ${values.address} `,
            },
          }),
        }).catch((error) => {
          console.log(error);
        });
        setIsLoading(false);
      } else if (response.status === 500) {
        console.log("error")
        toast({
          variant:"destructive",
          title: "Falha na inscrição",
          description: "Encontra-se já inscrito!",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="back h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 shadow-sm w-full sm:w-2/3">
        <SideLeft />
        <div className="bg-slate-100/30 backdrop-blur-sm col-span-2 py-8 px-4 sm:py-16 sm:px-12 md:px-36">
          <div className="sm:mt-12">
            <span className="font-bold text-2xl sm:text-3xl">
              Inscreva-se ao evento <br />
              de lançamento do <br />
              <span className="text-colorOne">S</span>
              <span className="text-colorTwo">T</span>
              <span className="text-colorThree">E</span>
              <span className="text-colorFour">A</span>
              <span className="text-colorFive">M</span>
            </span>

            <div className="flex flex-col mt-2">
              <h2 className="text-xl font-bold">
                Local:{" "}
                <span className="text-md font-normal">
                  Centro Cultural de Camões, Chaimite Cidade da Beira
                </span>
              </h2>
              <h2 className="text-xl font-bold">
                Data:
                <span className="text-md font-normal">
                  {" "}
                  10 de Setembro de 2024 | Das 14h30min às 16h30min
                </span>
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(handleSend)}
              className="space-y-4 mt-8"
              autoComplete="off"
            >
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-colorFive"
                >
                  Nome completo
                </Label>
                <Input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-colorFive"
                  >
                    Número com whatsapp
                  </Label>
                  <Input
                    {...register("phone")}
                    id="phone"
                    type="text"
                    placeholder="Número com whatsapp"
                    className="mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-colorFive"
                  >
                    E-mail
                  </Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Seu email"
                    className="mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-colorFive"
                >
                  Endereço
                </Label>
                <Input
                  {...register("address")}
                  id="address"
                  type="text"
                  placeholder="Seu endereço"
                  className="mt-1 w-full rounded-lg border-colorTwo bg-slate-50/30 px-3 py-2 text-[#333] placeholder:text-muted-foreground focus:border-colorTwo focus:ring-colorTwo"
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="col-span-2 flex items-center">
                  <Checkbox {...register("check")} className="mr-4" />
                  <span className="text-sm text-gray-400">
                    Aceita com todas nossas
                    {/* <Dialog> */}
                    {/* <DialogTrigger> */}
                    <span className="text-colorTwo cursor-pointer">
                      {" "}
                      Políticas de Privacidade
                    </span>
                    {/* </DialogTrigger> */}
                    {/* <ModalPrivacy message='lo'/> */}
                    {/* </Dialog>  */}
                  </span>
                </div>
                {errors.check && (
                  <span className="text-red-500 text-sm">
                    {errors.check.message}
                  </span>
                )}
                <Button
                  disabled={loading}
                  className={`bg-colorTwo sm:mt-4 hover:bg-colorFive ${
                    loading ?? "bg-slate-500"
                  }`}
                >
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
