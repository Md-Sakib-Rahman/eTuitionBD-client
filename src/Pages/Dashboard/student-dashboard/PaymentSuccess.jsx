import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const sessionId = searchParams.get("session_id");
  const applicationId = searchParams.get("applicationId");

  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !applicationId) {
        setStatus("error");
        return;
      }

      try {
        
        const res = await axiosSecure.post("/etutionbd/payment-success", {
          sessionId,
          applicationId,
        });

        if (res.data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification Failed:", error);
        setStatus("error");
      }
    };

    
    verifyPayment();
  }, [sessionId, applicationId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card w-96 bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center text-center">
          
          
          {status === "loading" && (
            <>
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <h2 className="card-title mt-4">Verifying Payment...</h2>
              <p className="text-base-content/60">Please wait a moment.</p>
            </>
          )}

         
          {status === "success" && (
            <>
              <FaCheckCircle className="text-6xl text-success mb-2" />
              <h2 className="card-title text-success">Payment Successful!</h2>
              <p>Your tutor has been hired successfully.</p>
              <div className="card-actions mt-6 w-full">
                <button 
                  onClick={() => navigate("/student-dashboard/my-sessions")} 
                  className="btn btn-primary w-full"
                >
                  Go to My Sessions
                </button>
              </div>
            </>
          )}

          
          {status === "error" && (
            <>
              <FaTimesCircle className="text-6xl text-error mb-2" />
              <h2 className="card-title text-error">Payment Failed</h2>
              <p>We couldn't verify your payment. If you were charged, please contact support.</p>
              <div className="card-actions mt-6 w-full">
                <button 
                  onClick={() => navigate("/student-dashboard")} 
                  className="btn btn-outline w-full"
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;