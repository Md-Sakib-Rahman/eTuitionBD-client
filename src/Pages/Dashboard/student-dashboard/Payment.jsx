import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaMoneyBillWave, FaArrowLeft, FaShieldAlt, FaLock } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const Payment = () => {
  const { id } = useParams();
  const applicationId = id;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosSecure.get(`/applications/${applicationId}`);
        setDetails(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load payment details");
        navigate(-1); 
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [applicationId, axiosSecure, navigate]);

  const handlePayment = async () => {
    setProcessing(true);
    const toastId = toast.loading("Connecting to Stripe...");

    try {
      const res = await axiosSecure.post("/etutionbd/payment", {
        applicationId: applicationId,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message || "Payment initialization failed");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!details) return <div className="text-center mt-20">Details not found</div>;

  const { postId, tutorId } = details;

  return (
    <div className="min-h-screen bg-base-100 p-6 flex justify-center items-center">
      
      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-0 md:flex-row">
          
          <div className="w-full md:w-1/2 p-8 bg-base-200/50">
            <button 
                onClick={() => navigate(-1)} 
                className="btn btn-sm btn-ghost gap-2 mb-6 pl-0 hover:bg-transparent"
            >
                <FaArrowLeft /> Back
            </button>

            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex items-center gap-4 mb-6 p-4 bg-base-100 rounded-xl border border-base-200">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={tutorId.image} alt="Tutor" />
                    </div>
                </div>
                <div>
                    <p className="text-xs text-base-content/60 uppercase font-bold">Tutor</p>
                    <p className="font-bold">{tutorId.name}</p>
                    <p className="text-xs">{tutorId.email}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-xs text-base-content/60 uppercase font-bold">Subject</p>
                    <p className="text-lg font-medium">{postId.subject}</p>
                </div>
                <div>
                    <p className="text-xs text-base-content/60 uppercase font-bold">Class / Grade</p>
                    <p className="text-lg font-medium">{postId.classGrade}</p>
                </div>
            </div>

            <div className="divider"></div>

            <div className="flex justify-between items-center text-xl font-bold">
                <span>Total to Pay</span>
                <span>${postId.budget} USD</span>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaMoneyBillWave className="text-3xl text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Secure Checkout</h1>
                <p className="text-base-content/60 mt-2">
                    Your payment is held in escrow until the job is completed.
                </p>
            </div>

            <div className="alert alert-info bg-blue-50 text-blue-800 text-sm mb-6 border-blue-200">
                <FaShieldAlt className="text-lg" />
                <span>
                    <strong>100% Secure.</strong> The tutor does not receive this money until you click "Confirm Job" after the session.
                </span>
            </div>

            <button 
                onClick={handlePayment}
                disabled={processing}
                className="btn btn-primary btn-lg w-full shadow-lg hover:shadow-primary/30 transition-all"
            >
                {processing ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    <>
                        <FaLock /> Pay ${postId.budget} Now
                    </>
                )}
            </button>
            
            <div className="mt-4 flex justify-center items-center gap-2 text-xs text-base-content/40">
                <span>Powered by</span>
                <span className="font-bold text-base-content/60 text-lg">stripe</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;