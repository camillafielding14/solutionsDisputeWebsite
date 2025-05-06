// Capitalize each word
function capitalizeWords(str) {
    return str.replace(/\b\w/g, match => match.toUpperCase());
}

// Format date to MM/DD/YYYY
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
}

// Format amount to $00.00
function formatMoney(amount) {
    return "$" + parseFloat(amount).toFixed(2);
}

// Show/hide verify video question based on sale type
function toggleVerifyVideo() {
    const saleType = document.getElementById("saleType").value;
    const verifyContainer = document.getElementById("verifyVideoContainer");
    verifyContainer.style.display = (saleType === "door") ? "block" : "none";
}

// Generate output
function generateBillingInfo() {
    const firstName = capitalizeWords(document.getElementById("firstName").value.trim());
    const lastName = capitalizeWords(document.getElementById("lastName").value.trim());
    const amount = document.getElementById("amount").value.trim();
    const subType = capitalizeWords(document.getElementById("subType").value.trim());
    const chargeDate = document.getElementById("chargeDate").value;
    const agreementDate = document.getElementById("agreementDate").value;
    const firstServiceDate = document.getElementById("firstServiceDate").value;
    const billingDate = document.getElementById("billingDate").value;
    const saleType = document.getElementById("saleType").value;
    const verifyVideo = document.getElementById("verifyVideo").value;

    // Validate fields
    if (!firstName || !lastName || !amount || !chargeDate || !subType || !agreementDate || !firstServiceDate || !billingDate || !saleType) {
        alert("Please fill in all fields.");
        return;
    }

    if (saleType === "door" && !verifyVideo) {
        alert("Please select whether there's a valid verify video.");
        return;
    }

    // Format dates
    const formattedChargeDate = formatDate(chargeDate);
    const formattedAgreementDate = formatDate(agreementDate);
    const formattedFirstServiceDate = formatDate(firstServiceDate);
    const formattedBillingDate = formatDate(billingDate);
    const formattedAmount = formatMoney(amount); // Format the amount

    // Paragraph logic based on sale type and verify video
    let saleDetails = "";

    if (saleType === "office") {
        saleDetails = `They acknowledged by initialing, signing, and verbally agreeing`;
    } else {
        if (verifyVideo === "yes") {
            saleDetails = `They acknowledged by initialing, signing, and verbally agreeing in a video`;
        } else {
            saleDetails = `They acknowledged by initialing, signing, and agreeing`;
        }
    }

    const billingParagraph = `${firstName} ${lastName} is disputing a charge of ${formattedAmount} made on ${formattedChargeDate}. ${firstName} signed an agreement for ${subType} Pest Control services with Brooks Pest Solutions on ${formattedAgreementDate}. This contract was emailed to ${firstName} on the same day and monthly billing was explained to them. ${saleDetails} to being billed monthly. The contract also states the customer authorizes Brooks to automatically bill ${firstName} according to the billing schedule shown in their contract. ${firstName}’s first service was completed on ${formattedFirstServiceDate}. On ${formattedBillingDate}, ${firstName} received their recurring monthly bill of ${formattedAmount} as outlined in their agreement with Brooks. Please see attached docs.`;

    const chargebackResponse = `Chargeback response has been submitted for the ${formattedAmount} charge on ${formattedChargeDate} and service fee added.`;

    const sections = [
        { title: "Copy Contact Email", content: "claims@brookspestsolutions.com" },
        { title: "Filled Monthly Billing Paragraph", content: billingParagraph },
        { title: "Attach the Following Documents", content: "- Signed Agreement (Found in Documents Tab)\n- Receipt of that Payment (Found in Invoice Tab)\n- Most Recent Service Notification (Found in Appointments)" },
        { title: "Invoice Instructions", content: `Add a charge for $35 in their invoices. Put that it's a Service Fee.\nCopy the case ID number and put it in the notes of the new invoice.\n\nIn the customer card, click on the Chargeback task and change from “Pending” to “Completed.”` },
        { title: "Internal Note", content: chargebackResponse }
    ];

    const outputContainer = document.getElementById("outputContainer");
    outputContainer.innerHTML = "";

    sections.forEach((section, index) => {
        const box = document.createElement("div");
        box.className = "output-box";

        const title = document.createElement("h3");
        title.textContent = section.title;

        const content = document.createElement("pre");
        content.textContent = section.content;
        content.id = `outputSection${index}`;

        box.appendChild(title);
        box.appendChild(content);

        if (["Copy Contact Email", "Filled Monthly Billing Paragraph", "Internal Note"].includes(section.title)) {
            const button = document.createElement("button");
            button.textContent = "Copy";
            button.className = "copy-btn";
            button.onclick = () => copyTextById(content.id);
            box.appendChild(button);
        }

        outputContainer.appendChild(box);
    });
}

function copyTextById(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text)
        .then(() => showCopiedPopup())
        .catch(err => console.error("Copy failed: ", err));
}

function showCopiedPopup() {
    const popup = document.createElement("div");
    popup.textContent = "Copied!";
    popup.className = "copied-popup";

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1000);
}

