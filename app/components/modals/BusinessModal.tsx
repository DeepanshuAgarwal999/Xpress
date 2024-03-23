"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import useSetupBusiness from "@/app/hooks/useSetupBusiness";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { Feature } from "@prisma/client";

enum STEPS {
  CATEGORY = 0,
  AADHAAR = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const BusinessModal = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  // const [aadhaar, setAadhaar] = useState({
  //   number: "",
  //   aadhaarFront: undefined,
  //   aadhaarBack: undefined,
  // });

  const [isAadhaar, setisAadhaar] = useState(false);
  const [aadhaarImgFront, setAadhaarImgFront] = useState<File | null>(null);
  const [aadhaarImgBack, setAadhaarImgBack] = useState<File | null>(null);
  const handleImageChangeFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setAadhaarImgFront(e.target.files[0]);
  };
  const handleImageChangeBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("called");
    if (!e.target.files) return;
    setAadhaarImgBack(e.target.files[0]);
    console.log(aadhaarImgBack);
  };

  const [offTime, setOffTime] = useState<string[]>([]);

  const addOffTime = () => {
    setOffTime([...offTime, ""]);
  };
  const addFeature = () => {
    setFeatures([
      ...features,
      {
        service: "",
        price: 0,
      },
    ]); // Add a new empty string to the features array
  };

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get("/api/addaadhaar");
        if (data.aadhaar) {
          setisAadhaar(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);
  const convertImageToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string | null;
        if (result) {
          resolve(result.split(",")[1]); // Extract base64 data excluding the data URI prefix
        } else {
          reject(new Error("Failed to read file."));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const handleAadhaar = async (e: any) => {
    e.preventDefault();
    const formEvent = e.target;
    const form = new FormData(formEvent);
    // Convert front and back images to Base64
    const aadhaarFrontImg = form.get("aadhaarFrontImg");
    const aadhaarBackImg = form.get("aadhaarBackImg");

    if (aadhaarFrontImg && aadhaarBackImg) {
      const frontImageBase64 = await convertImageToBase64(
        aadhaarFrontImg as File
      );
      const backImageBase64 = await convertImageToBase64(
        aadhaarBackImg as File
      );

      // Include the Base64-encoded images in the form data
      form.set("aadhaarFrontImg", frontImageBase64);
      form.set("aadhaarBackImg", backImageBase64);
    }

    // Send the form data to your server or perform further processing
    // (e.g., submitting to MongoDB)
    let res = Object.fromEntries(form);
    console.log(res);
    addAadhaar(res);
  };

  const addAadhaar = async (aadhaarinfo: unknown) => {
    // if (!aadhaar || aadhaar.length !== 12) return;
    try {
      setIsLoading(true);
      const { data } = await axios.patch("/api/addaadhaar", {
        ...aadhaarinfo!,
      });
      if (data) {
        toast.success("Aadhaar added successfully");
        setStep(STEPS.INFO);
      } else {
        toast.error("unable to add Aadhaar number");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFeatureChange = (index: number, value: Feature) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };
  const handleOffTimechange = (index: number, value: string) => {
    const updatedTime: string[] = [...offTime];
    updatedTime[index] = value;
    setOffTime(updatedTime);
  };
  const businessModal = useSetupBusiness();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      aadhaar: "",
      category: "",
      time: "",
      offTime: [],
      imageSrc: "",
      price: 1,
      title: "",
      imageAadhaarFrontSrc: "",
      imageAadhaarBackSrc: "",
      description: "",
      features: [{ service: "", price: 0 }],
    },
  });
  const category = watch("category");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const removeFeature = () => {
    const updatedFeatures = [...features];
    updatedFeatures.pop();
    setFeatures(updatedFeatures);
  };
  const removeOffTime = () => {
    const updatedOffTime = [...offTime];
    updatedOffTime.pop();
    setOffTime(updatedOffTime);
  };
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", { ...data, features, offTime })
      .then(() => {
        // addAadhaar(data.aadhaar);
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        businessModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sortByName = (a: any, b: any) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Select Hair Salon to proceed further" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.sort(sortByName).map((item) => (
          <div className=" col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.AADHAAR) {
    if (isAadhaar) {
      setStep(STEPS.INFO);
    }
    bodyContent = (
      <form className="flex flex-col gap-4" onSubmit={(e) => handleAadhaar(e)}>
        <Heading title="Required Aadhaar Number" />
        <input type="text" placeholder="Enter aadhaar number" name="aadhaar" />

        <h1>Front Image of Aadhaar</h1>
        <input
          type="file"
          id="aadhaarFront"
          name="aadhaarFrontImg"
          onChange={handleImageChangeFront}
        />
        <h1>Back Image of Aadhaar</h1>
        <input
          type="file"
          id="aadhaarBack"
          name="aadhaarBackImg"
          onChange={handleImageChangeBack}
        />
        <button
          type="submit"
          className="mt-2 bg-red-500 font-semibold w-[100px] mx-auto text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some details about your business"
          subtitle="What service do you provide?"
        />
        <div>
          <div className="flex flex-col gap-2">
            {features.map((feature, index) => (
              // eslint-disable-next-line react/jsx-key
              <div className="flex gap-8 ">
                <input
                  key={index}
                  className="border p-2"
                  value={feature.service}
                  onChange={(e) =>
                    handleFeatureChange(index, {
                      ...feature,
                      service: e.target.value,
                    })
                  }
                  disabled={isLoading}
                />
                <input
                  key={index}
                  id="price"
                  type="number"
                  className="border border-solid "
                  onChange={(e) =>
                    handleFeatureChange(index, {
                      ...feature,
                      price: parseInt(e.target.value),
                    })
                  }
                  disabled={isLoading}
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              className="mt-2 bg-blue-500 text-white p-2 rounded"
              onClick={addFeature}
            >
              + Add Service
            </button>
            <button
              type="button"
              className="mt-2 bg-red-500 text-white p-2 rounded"
              onClick={removeFeature}
            >
              - Remove Service
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your business"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your business?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your  time" />
        <Input
          id="time"
          label="Time in hh/mm"
          type="time"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Heading title="Now set your off hours" />

        <div className="flex gap-2 flex-wrap">
          {offTime.map((time, index) => (
            <div className="flex gap-8 ">
              <input
                key={index}
                className="border p-2"
                type="time"
                value={time}
                onChange={(e) => handleOffTimechange(index, e.target.value)}
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="mt-2 bg-blue-500 text-white p-2 rounded"
            onClick={addOffTime}
          >
            Add offtime
          </button>
          <button
            type="button"
            className="mt-2 bg-red-500 text-white p-2 rounded"
            onClick={removeOffTime}
          >
            Remove offtime
          </button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      title="Your Business"
      isOpen={businessModal.isOpen}
      onClose={businessModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default BusinessModal;
