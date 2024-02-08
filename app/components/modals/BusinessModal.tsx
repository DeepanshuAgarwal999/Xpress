'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import useSetupBusiness from '@/app/hooks/useSetupBusiness';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { Feature } from '@prisma/client';

enum STEPS {
  CATEGORY = 0,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const BusinessModal = () => {
  const [features, setFeatures] = useState<Feature[]>([]);

  const addFeature = () => {
    setFeatures([...features, {
      service: "",
      price: 0,
    }]); // Add a new empty string to the features array
  };
  const handleFeatureChange = (index: number, value: Feature) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
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
      category: '',
      time: '',
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
      features: [{ service: "", price: 0 }],
    },
  });
  const category = watch('category');
  const imageSrc = watch('imageSrc');

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
      return 'Create';
    }
    return 'Next';
  }, [step]);


  const removeFeature = () => {
    const updatedFeatures = [...features];
    updatedFeatures.pop();
    setFeatures(updatedFeatures);
  }


  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post('/api/listings', { ...data, features })
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        businessModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
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
      <Heading
        title="Select Hair Salon to proceed further"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.sort(sortByName).map((item) => (
          <div className=" col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

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
                  onChange={(e) => handleFeatureChange(index, { ...feature, service: e.target.value })}
                  disabled={isLoading}
                />
                <input
                  key={index}
                  id="price"
                  type="number"
                  className="border border-solid "
                  onChange={(e) => handleFeatureChange(index, { ...feature, price: parseInt(e.target.value) })}
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
          onChange={(value) => setCustomValue('imageSrc', value)}
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
        <Heading
          title="Now, set your  time"
        />
        <Input
          id="time"
          label="Time in hh/mm"
          type="time"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
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
