/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use strict";
import "./styles.css";

const tables: Element | any = document.querySelector(".tables");

const accept = document
    .querySelector(".accept")
    ?.addEventListener("click", () => {
        const contactsNumber: any | null =
            document.querySelector(".contactsNumber");

        if (!isNaN(parseInt(contactsNumber.value))) {
            const response = fetch(
                "http://localhost:3000/contacts/" + contactsNumber.value,
                {
                    method: "GET",
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    tables.innerHTML = `
                            <tr><th>id</th><th>name</th><th>email</th><th>phone</th></tr>
                            <td>${data.id}</td>
                            <td>${data.name}</td>
                            <td>${data.email}</td>
                            <td>${data.phone}</td>`;
                });
        } else
            tables.innerHTML = fetch("http://localhost:3000/contacts/", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    tables.innerHTML =
                        "<tr><th>id</th><th>name</th><th>email</th><th>phone</th> </tr>"
                            for (const item of data) {
                            tables.innerHTML += `
                                    <tr>
                                    <td>${item.id}</td>
                                    <td>${item.name}</td>
                                    <td>${item.email}</td>
                                    <td>${item.phone}</td>
                                    </tr>`;
                    }
                });
    });
