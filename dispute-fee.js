function capitalizeWords(str) {
    return str.replace(/\b\w/g, match => match.toUpperCase());
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
}

function formatMoney(amount) {
    return "$" + parseFloat(amount).toFixed(2);
}

function toggleVerifyVideo() {
    const saleType = document.getElementById("saleType").value;
    const verifyContainer = document.getElementById("verifyVideoContainer");
    verifyContainer.style.display = (saleType === "door") ? "block" : "none";
}

function generateDisputeFeeInfo() {
    const firstName = capitalizeWords(document.getElementById("firstName").value.trim());
    const lastName = capitalizeWords(document.getElementById("lastName").value.trim());
    const amount = document.getElementById("amount").value.trim();
    const subType = capitalizeWords(document.getElementById("subType").value.trim());
    const chargeDate = document.getElementById("chargeDate").value;
    const agreementDate = document.getElementById("agreementDate").value;
    const firstServiceDate = document.getElementById("firstServiceDate").value;
    const saleType = document.getElementById("saleType").value;
    const verifyVideo = document.getElementById("verifyVideo").value;

    if (!firstName || !lastName || !amount || !chargeDate || !subType || !agreementDate || !firstServiceDate || !saleType) {
        alert("Please fill in all fields.");
        return;
    }

    if (saleType === "door" && !verifyVideo) {
        alert("Please select whether there's a valid verify video.");
        return;
    }

    const formattedChargeDate = formatDate(chargeDate);
    const formattedAgreementDate = formatDate(agreementDate);
    const formattedFirstServiceDate = formatDate(firstServiceDate);
    const formattedAmount = formatMoney(amount); // Format the amount

    let saleDetails = "";

    if (saleType === "office") {
        saleDetails = `They acknowledged by initialing, signing, and verbally agreeing`;
    } else {
        saleDetails = verifyVideo === "yes"
            ? `They acknowledged by initialing, signing, and verbally agreeing in a video`
            : `They acknowledged by initialing, signing, and agreeing`;
    }

    const billingParagraph = `${firstName} ${lastName} is disputing a charge of ${formattedAmount} made on ${formattedChargeDate}. ${firstName} signed an agreement for ${subType} Pest Control services with Brooks Pest Solutions on ${formattedAgreementDate}. This contract was emailed to ${firstName} on the same day. ${saleDetails} to the terms outlined in the contract. ${firstName}’s first service was completed on ${formattedFirstServiceDate}. ${firstName} disputed a previous charge associated with their contract, and as stated on the agreement, all disputes are subject to a $35 fee per dispute. Please see attached docs.`;

    const chargebackResponse = `Chargeback response has been submitted for the ${formattedAmount} charge on ${formattedChargeDate} and $35 service fee added.`;

    const sections = [
        { title: "Copy Contact Email", content: "claims@brookspestsolutions.com" },
        { title: "Filled Dispute Fee Paragraph", content: billingParagraph },
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

        if (["Copy Contact Email", "Filled Dispute Fee Paragraph", "Internal Note"].includes(section.title)) {
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
