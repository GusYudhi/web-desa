"use client";

import { Input } from "@/lib/components/Form/Input";
import { SelectSearch } from "@/lib/components/Form/SelectSearch";
import { SelectType } from "@/lib/components/Form/SelectType";
import { TextareaInput } from "@/lib/components/Form/TextareaInput";
import { searchKartuKeluarga } from "@/server/data/kartuKeluargaData";
import { MastersType } from "@/server/data/pendudukData";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Button, Form, Spinner } from "reactstrap";
import { tambahDataPenduduk } from "@/actions/pendudukActions";
import { useFormSubmit } from "@/hooks/form";
import { DataPendudukFormSchemaInputType } from "@/actions/formschemas/pendudukSchemas";
import { TablePendudukContext } from "./providers";

export interface IFormTambahPenduduk {
  masters: MastersType;
}

function FormTambahPenduduk({ masters }: IFormTambahPenduduk) {
  const {
    dataTable: { fetchData },
    setShowOffcanvas,
  } = useContext(TablePendudukContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useFormSubmit<DataPendudukFormSchemaInputType>(async (data, setError) => {
    await toast.promise(tambahDataPenduduk(data), {
      pending: "Menambahkan data penduduk...",
      success: {
        async render() {
          await fetchData();
          setShowOffcanvas(false);
          return "Data penduduk berhasil ditambahkan";
        },
      },
      error: {
        render() {
          return "Terjadi kesalahan saat menambahkan data penduduk";
        },
      },
    });
  });

  return (
    <Form onSubmit={handleSubmit()}>
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
      <SelectSearch
        label="Nomor Kartu Keluarga"
        {...register("kk_id")}
        error={errors.kk_id?.message}
        required
        actiontitle="Tambah Data"
        setvalue={(value: string) => {
          setValue("kk_id", value, { shouldValidate: true });
        }}
        searchfunction={async (value) => {
          // fungsi searchKartuKeluarga berjalan di sisi server
          const data = await searchKartuKeluarga(value);
          const result = [];
          for (const item of data) {
            result.push({
              id: item.nomor_kk,
              nama: item.kepala_keluarga?.nama || "Tidak diketahui",
            });
          }
          return result;
        }}
      />
      <SelectType
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
        setvalue={(value: string) => {
          setValue("jenis_kelamin", value as "Pria" | "Wanita", {
            shouldValidate: true,
          });
        }}
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
      <SelectType
        label="Agama"
        {...register("agama_id")}
        error={errors.agama_id?.message}
        required
        options={masters.agama}
        setvalue={(value: string) => {
          setValue("agama_id", value, { shouldValidate: true });
        }}
      />
      <TextareaInput
        label="Alamat"
        {...register("alamat")}
        error={errors.alamat?.message}
      />
      <SelectType
        label="Disabilitas"
        {...register("cacat_id")}
        error={errors.cacat_id?.message}
        required
        options={masters.disabilitas}
        setvalue={(value: string) => {
          setValue("cacat_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Hubungan"
        {...register("hubungan_id")}
        error={errors.hubungan_id?.message}
        required
        options={masters.hubungan}
        setvalue={(value: string) => {
          setValue("hubungan_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Golongan Darah"
        {...register("golongan_darah_id")}
        error={errors.golongan_darah_id?.message}
        required
        options={masters.golonganDarah}
        setvalue={(value: string) => {
          setValue("golongan_darah_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Sakit Menahun"
        {...register("sakit_menahun_id")}
        error={errors.sakit_menahun_id?.message}
        required
        options={masters.sakitMenahun}
        setvalue={(value: string) => {
          setValue("sakit_menahun_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Pekerjaan"
        {...register("pekerjaan_id")}
        error={errors.pekerjaan_id?.message}
        required
        options={masters.pekerjaan}
        setvalue={(value: string) => {
          setValue("pekerjaan_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Pendidikan"
        {...register("pendidikan_id")}
        error={errors.pendidikan_id?.message}
        required
        options={masters.pendidikan}
        setvalue={(value: string) => {
          setValue("pendidikan_id", value, { shouldValidate: true });
        }}
      />
      <Input
        label="Nomor Akta Kelahiran"
        {...register("nomor_akta_lahir")}
        error={errors.nomor_akta_lahir?.message}
        required
      />
      <SelectType
        label="Status Dasar"
        {...register("status_dasar_id")}
        error={errors.status_dasar_id?.message}
        required
        options={masters.statusDasar}
        setvalue={(value: string) => {
          setValue("status_dasar_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Status"
        {...register("status_id")}
        error={errors.status_id?.message}
        required
        options={masters.status}
        setvalue={(value: string) => {
          setValue("status_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Suku"
        {...register("suku_id")}
        error={errors.suku_id?.message}
        required
        options={masters.suku}
        setvalue={(value: string) => {
          setValue("suku_id", value, { shouldValidate: true });
        }}
      />
      <SelectType
        label="Status Kawin"
        {...register("status_kawin_id")}
        error={errors.status_kawin_id?.message}
        required
        options={masters.statusKawin}
        setvalue={(value: string) => {
          setValue("status_kawin_id", value, { shouldValidate: true });
        }}
      />
      <Input
        label="Telepon"
        {...register("telepon")}
        error={errors.telepon?.message}
      />
      <Button
        type="submit"
        color="primary"
        disabled={isSubmitting}
        className="w-100 text-center d-flex align-items-center justify-content-center"
      >
        {isSubmitting ? <Spinner size="sm" color="light" /> : "Simpan"}
      </Button>
    </Form>
  );
}

export default FormTambahPenduduk;
