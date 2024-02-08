'use client'


import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";


enum STEPS {
    CATEGORY = 1,
    LOCATION = 2, 
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    PRICE = 6
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset

    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''

        }


    })

    const category = watch('category');
    const location = watch('location');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const guestCount = watch('guestCount');
    const imageSrc = watch('imageSrc');


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }



    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step])

     const secondaryActionLabel = useMemo(() => {
       if (step === STEPS.CATEGORY) {
         return undefined;
       }

       return "Back";
     }, [step]);
    
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />

            {/* category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        {/* connect categoryinput to the form */}
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
    )

    // location
    if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where is your place located?"
              subtitle="Help guests find you!"
            />
            <CountrySelect
              value={location}
              onChange={(value) => setCustomValue("location", value)}
            />
            <Map
                center={location?.latlng}  
            />
          </div>
        );
    }

    // info

    if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Share some basics about your place..."
              subtitle="What amenities do you have?"
            />
            <Counter
              title="Guests"
              subtitle="How many guests do you allow?"
              value={guestCount}
              onChange={(value) => setCustomValue("guestCount", value)}
            />
                <hr />
                
            <Counter
              title="Rooms"
              subtitle="How many rooms do you have?"
              value={roomCount}
              onChange={(value) => setCustomValue("roomCount", value)}
            />
                <hr />

            <Counter
              title="Bathrooms"
              subtitle="How many bahtrooms do you have?"
              value={bathroomCount}
              onChange={(value) => setCustomValue("bathroomCount", value)}
            />
          </div>
        );
    }

    // images

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />

            </div>
        )
    }





    return (
        <Modal
            title="Airbnb your home"
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    );
}
 
export default RentModal;