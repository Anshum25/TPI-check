import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Last updated: January 7, 2026</p>
                  <p className="mb-6">
                    This Privacy Policy describes Our policies and procedures on the collection, use, processing, storage, and disclosure of Your information when You use the Service and explains Your privacy rights and how the applicable laws of India protect You.
                  </p>
                  <p className="mb-8">
                    By accessing or using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Interpretation and Definitions</h2>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">Interpretation</h3>
                  <p className="mb-4">
                    Words with capitalized initials have meanings defined below. These definitions apply whether the terms appear in singular or plural form.
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mb-3">Definitions</h3>
                  <p className="mb-3">For the purposes of this Privacy Policy:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                    <li><strong>Company</strong> (referred to as "the Company", "We", "Us" or "Our") refers to Turning Point Institute, 306, The Grand Monarch, Near Sima Hall, Anand Nagar Road, Satellite, Ahmedabad – 380015, Gujarat, India.</li>
                    <li><strong>Cookies</strong> are small files placed on Your device to store information about Your usage of the Website.</li>
                    <li><strong>Country</strong> refers to India.</li>
                    <li><strong>Device</strong> means any device that can access the Service, such as a computer, mobile phone, or tablet.</li>
                    <li><strong>Personal Data</strong> means any data about an individual who is identifiable by or in relation to such data.</li>
                    <li><strong>Service</strong> refers to the Website.</li>
                    <li><strong>Service Provider</strong> means any third party that processes data on behalf of the Company.</li>
                    <li><strong>Usage Data</strong> refers to data collected automatically when using the Service.</li>
                    <li><strong>Website</strong> refers to Turning Point Institute, accessible at www.turningpointinstitute.in</li>
                    <li><strong>You / User / Data Principal</strong> means the individual accessing or using the Service.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Collection of Personal Data</h2>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">Types of Data Collected</h3>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-2">Personal Data</h4>
                  <p className="mb-3">While using Our Service, We may collect the following Personal Data:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-6">
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Course enquiry or admission-related information</li>
                    <li>Any information voluntarily submitted through forms or communication channels</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground mb-2">Usage Data</h4>
                  <p className="mb-3">Usage Data is collected automatically and may include:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-6">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Device identifiers</li>
                    <li>Diagnostic and analytical data</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground mb-2">Cookies and Tracking Technologies</h4>
                  <p className="mb-3">We use Cookies and similar technologies to improve user experience, analyze traffic, and ensure website functionality.</p>
                  
                  <h5 className="text-base font-semibold text-foreground mb-2">Types of Cookies Used</h5>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li><strong>Essential Cookies (Session Cookies)</strong> Required for basic website functionality and security.</li>
                    <li><strong>Consent Cookies (Persistent Cookies)</strong> Store your cookie consent preferences.</li>
                    <li><strong>Functionality Cookies (Persistent Cookies)</strong> Remember user preferences such as language or form inputs.</li>
                  </ul>
                  <p className="mb-6">
                    You may disable cookies via your browser settings; however, some features of the Service may not function properly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Purpose of Using Personal Data</h2>
                  <p className="mb-3">The Company may use Personal Data for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>To provide, operate, and maintain the Service</li>
                    <li>To respond to enquiries and admission requests</li>
                    <li>To contact You via phone, email, or SMS regarding academic services</li>
                    <li>To send updates, notices, or important institutional information</li>
                    <li>To improve website performance and user experience</li>
                    <li>To comply with legal and regulatory obligations</li>
                    <li>For internal analytics and administrative purposes</li>
                  </ul>
                  <p className="mb-6">We do not sell or rent Personal Data.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Legal Basis for Processing (India – DPDP Act, 2023)</h2>
                  <p className="mb-3">We process Personal Data based on:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>User consent</li>
                    <li>Legitimate educational and administrative purposes</li>
                    <li>Compliance with applicable laws</li>
                  </ul>
                  <p className="mb-6">You may withdraw consent at any time by contacting Us.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Sharing of Personal Data</h2>
                  <p className="mb-3">We may share Your Personal Data only in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>With Service Providers for hosting, analytics, or communication services</li>
                    <li>To comply with legal obligations or government authorities</li>
                    <li>During business restructuring or institutional transfer, if applicable</li>
                    <li>With Your explicit consent</li>
                  </ul>
                  <p className="mb-6">All third parties are required to maintain confidentiality and data security.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
                  <p className="mb-3">We retain Personal Data only for as long as necessary to:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Fulfill educational and administrative purposes</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                  <p className="mb-6">When no longer required, data is securely deleted or anonymized.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Transfer of Personal Data</h2>
                  <p className="mb-6">
                    Your Personal Data may be processed or stored on servers located within or outside India. We ensure appropriate safeguards are in place to protect Your data in accordance with applicable laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights as a Data Principal</h2>
                  <p className="mb-3">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Access Your Personal Data</li>
                    <li>Request correction or updating of inaccurate data</li>
                    <li>Request deletion of Your Personal Data</li>
                    <li>Withdraw consent</li>
                    <li>File a grievance regarding data misuse</li>
                  </ul>
                  <p className="mb-6">To exercise these rights, contact Us using the details below.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                  <p className="mb-6">
                    We use reasonable administrative, technical, and physical security measures to protect Personal Data. However, no system is completely secure, and absolute security cannot be guaranteed.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
                  <p className="mb-6">
                    Our Service is not intended for children under the age of 13 years. We do not knowingly collect Personal Data from children without parental consent. If such data is identified, it will be deleted promptly.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Links to Third-Party Websites</h2>
                  <p className="mb-6">
                    Our Website may contain links to external websites. We are not responsible for the privacy practices or content of third-party sites. Users are encouraged to review their privacy policies separately.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
                  <p className="mb-6">
                    We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Service after changes implies acceptance of the updated policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Contact & Grievance Redressal</h2>
                  <p className="mb-3">
                    If You have any questions, concerns, or requests regarding this Privacy Policy or Your Personal Data, You may contact Us:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li><strong>Phone:</strong> +91 97255 00435</li>
                    <li><strong>Address:</strong> Turning Point Institute, Ahmedabad, Gujarat, India</li>
                  </ul>
                  <p>We will make reasonable efforts to respond to grievances in a timely manner.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;