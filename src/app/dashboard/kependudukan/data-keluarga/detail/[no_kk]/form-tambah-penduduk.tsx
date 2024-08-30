"use client";

import { Input } from "@/components/Form/Input";
import { Select } from "@/components/Form/Select";
import { pendudukActions } from "@/server/actions";
import { PendudukFormSchema } from "@/server/actions/formschemas";
import { MastersType } from "@/server/data/pendudukData";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";

export interface IFormTambahPenduduk {
  masters: MastersType;
  nomor_kk: string;
}

function FormTambahPenduduk({ masters, nomor_kk }: IFormTambahPenduduk) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PendudukFormSchema.DataPendudukTanpaKKFormSchemaInputType>({
    resolver: zodResolver(
      PendudukFormSchema.tambahDataPendudukTanpaKKSchema,
      {},
      { raw: true }
    ),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<
    PendudukFormSchema.DataPendudukTanpaKKFormSchemaInputType
  > = async (data) => {
    console.log("submitting");
    const formData = new FormData();

    for (const key in data) {
      formData.append(
        key,
        data[
          key as keyof PendudukFormSchema.DataPendudukTanpaKKFormSchemaInputType
        ]
      );
    }

    formData.append("kk_id", nomor_kk);

    const success = await pendudukActions.tambahDataPenduduk(formData);
    reset();
    if (success) {
      alert("Berhasil");
      // reload page
      window.location.reload();
    } else {
      alert("Gagal");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nama"
        {...register("nama")}
        error={errors.nama?.message}
        required
      />
      <Input
        label="NIK"
        {...register("nik")}
        error={errors.nik?.message}
        required
      />
      <Select
        label="Jenis Kelamin"
        {...register("jenis_kelamin")}
        error={errors.jenis_kelamin?.message}
        required
        options={[
          {
            nama: "Pria",
            id: "Pria",
          },
          {
            nama: "Wanita",
            id: "Wanita",
          },
        ]}
      />
      <Input
        label="Tanggal Lahir"
        {...register("tanggal_lahir")}
        error={errors.tanggal_lahir?.message}
        required
        type="date"
      />
      <Input
        label="Tempat Lahir"
        {...register("tempat_lahir")}
        error={errors.tempat_lahir?.message}
        required
      />
      <Select
        label="Agama"
        {...register("agama_id")}
        error={errors.agama_id?.message}
        required
        options={masters.agama}
      />
      <Input
        label="Alamat"
        {...register("alamat")}
        error={errors.alamat?.message}
      />
      <Select
        label="Disabilitas"
        {...register("cacat_id")}
        error={errors.cacat_id?.message}
        required
        options={masters.disabilitas}
      />
      <Select
        label="Hubungan"
        {...register("hubungan_id")}
        error={errors.hubungan_id?.message}
        required
        options={masters.hubungan}
      />
      <Select
        label="Golongan Darah"
        {...register("golongan_darah_id")}
        error={errors.golongan_darah_id?.message}
        required
        options={masters.golonganDarah}
      />
      <Select
        label="Sakit Menahun"
        {...register("sakit_menahun_id")}
        error={errors.sakit_menahun_id?.message}
        required
        options={masters.sakitMenahun}
      />
      <Select
        label="Pekerjaan"
        {...register("pekerjaan_id")}
        error={errors.pekerjaan_id?.message}
        required
        options={masters.pekerjaan}
      />
      <Select
        label="Pendidikan"
        {...register("pendidikan_id")}
        error={errors.pendidikan_id?.message}
        required
        options={masters.pendidikan}
      />
      <Input
        label="Nomor Akta Kelahiran"
        {...register("nomor_akta_lahir")}
        error={errors.nomor_akta_lahir?.message}
        required
      />
      <Select
        label="Status Dasar"
        {...register("status_dasar_id")}
        error={errors.status_dasar_id?.message}
        required
        options={masters.statusDasar}
      />
      <Select
        label="Status"
        {...register("status_id")}
        error={errors.status_id?.message}
        required
        options={masters.status}
      />
      <Select
        label="Suku"
        {...register("suku_id")}
        error={errors.suku_id?.message}
        required
        options={masters.suku}
      />
      <Select
        label="Status Kawin"
        {...register("status_kawin_id")}
        error={errors.status_kawin_id?.message}
        required
        options={masters.statusKawin}
      />
      <Input
        label="Telepon"
        {...register("telepon")}
        error={errors.telepon?.message}
      />
      <Button type="submit" className="btn-primary btn-sm">
        {isSubmitting ? "Loading..." : "Tambah Data"}
      </Button>
    </Form>
  );
}

export default FormTambahPenduduk;