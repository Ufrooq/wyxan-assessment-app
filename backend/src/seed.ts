import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AppModule } from './app.module';
import { Person } from './people/person.schema';
import { Site } from './sites/site.schema';
import { extractTextContent, sanitizeSiteHtml } from './sites/sites.utils';
import { Visit } from './visits/visit.schema';

type SeedPerson = Person & { _id: Types.ObjectId };
type SeedSite = Site & { _id: Types.ObjectId };

const people = ['Umar', 'Amina', 'Hassan', 'Sara'];

const sites = [
    {
        address: 'tidepool.zz',
        title: 'Tidepool Notes',
        authorName: 'Umar',
        bodyHtml:
            '<h1>Tidepool Notes</h1><p>A quiet page about shells, pools, patient water, and small field observations.</p><p>Visit <a href="moon-cafe.zz">Moon Cafe</a> or follow the broken path to <a href="lost-pier.zz">Lost Pier</a>.</p>',
    },
    {
        address: 'moon-cafe.zz',
        title: 'Moon Cafe',
        authorName: 'Amina',
        bodyHtml:
            '<h1>Moon Cafe</h1><p>Open late for readers, stargazers, and people who like cinnamon coffee.</p><p>Our notice board links to <a href="archive-house.zz">Archive House</a>.</p>',
    },
    {
        address: 'archive-house.zz',
        title: 'Archive House',
        authorName: 'Hassan',
        bodyHtml:
            '<h1>Archive House</h1><p>A tiny archive of maps, letters, field notes, recipes, and weather records.</p><p>Try <a href="garden-radio.zz">Garden Radio</a> or <a href="paper-orbit.zz">Paper Orbit</a>.</p>',
    },
    {
        address: 'garden-radio.zz',
        title: 'Garden Radio',
        authorName: 'Umar',
        bodyHtml:
            '<h1>Garden Radio</h1><p>Broadcasting soft music for tomatoes, mint, basil, and night flowers.</p><p>Return to <a href="tidepool.zz">Tidepool Notes</a>.</p>',
    },
    {
        address: 'lantern-market.zz',
        title: 'Lantern Market',
        authorName: 'Sara',
        bodyHtml:
            '<h1>Lantern Market</h1><p>A market for repaired clocks, blue notebooks, tea tins, and brass lamps.</p><p>Merchants recommend <a href="copper-map.zz">Copper Map</a>.</p>',
    },
    {
        address: 'copper-map.zz',
        title: 'Copper Map',
        authorName: 'Hassan',
        bodyHtml:
            '<h1>Copper Map</h1><p>A hand drawn map of quiet railway stops, hidden rooms, and old bridges.</p><p>One label points to <a href="mirror-hotel.zz">Mirror Hotel</a>, but nobody has found it.</p>',
    },
    {
        address: 'paper-orbit.zz',
        title: 'Paper Orbit',
        authorName: 'Amina',
        bodyHtml:
            '<h1>Paper Orbit</h1><p>Small astronomy notes folded into paper models of planets and comets.</p><p>Compare notes with <a href="weather-attic.zz">Weather Attic</a>.</p>',
    },
    {
        address: 'weather-attic.zz',
        title: 'Weather Attic',
        authorName: 'Sara',
        bodyHtml:
            '<h1>Weather Attic</h1><p>Boxes of rain charts, cloud sketches, and storm names from previous summers.</p><p>The attic window faces <a href="quiet-rail.zz">Quiet Rail</a>.</p>',
    },
    {
        address: 'quiet-rail.zz',
        title: 'Quiet Rail',
        authorName: 'Umar',
        bodyHtml:
            '<h1>Quiet Rail</h1><p>A page for train timetables that no longer exist, platform stories, and slow travel.</p><p>Next stop: <a href="signal-kitchen.zz">Signal Kitchen</a>.</p>',
    },
    {
        address: 'signal-kitchen.zz',
        title: 'Signal Kitchen',
        authorName: 'Hassan',
        bodyHtml:
            '<h1>Signal Kitchen</h1><p>Recipes sent by radio signal: soup, bread, spiced tea, and emergency cake.</p><p>A faded card mentions <a href="blue-door.zz">Blue Door</a>.</p>',
    },
];

const visitPlan = [
    ['Umar', 'tidepool.zz', 'typed', null, '2026-09-23T09:00:00.000Z'],
    ['Umar', 'moon-cafe.zz', 'link', 'tidepool.zz', '2026-09-23T09:06:00.000Z'],
    ['Umar', 'archive-house.zz', 'link', 'moon-cafe.zz', '2026-09-23T09:12:00.000Z'],
    ['Umar', 'garden-radio.zz', 'link', 'archive-house.zz', '2026-09-23T09:18:00.000Z'],
    ['Umar', 'lost-pier.zz', 'link', 'tidepool.zz', '2026-09-23T09:24:00.000Z'],
    ['Umar', 'lantern-market.zz', 'typed', null, '2026-09-23T09:30:00.000Z'],
    ['Umar', 'copper-map.zz', 'link', 'lantern-market.zz', '2026-09-23T09:36:00.000Z'],
    ['Umar', 'paper-orbit.zz', 'typed', null, '2026-09-23T09:42:00.000Z'],
    ['Umar', 'weather-attic.zz', 'link', 'paper-orbit.zz', '2026-09-23T09:48:00.000Z'],
    ['Umar', 'quiet-rail.zz', 'link', 'weather-attic.zz', '2026-09-23T09:54:00.000Z'],
    ['Umar', 'signal-kitchen.zz', 'link', 'quiet-rail.zz', '2026-09-23T10:00:00.000Z'],
    ['Amina', 'moon-cafe.zz', 'typed', null, '2026-09-23T10:05:00.000Z'],
    ['Amina', 'archive-house.zz', 'link', 'moon-cafe.zz', '2026-09-23T10:13:00.000Z'],
    ['Amina', 'paper-orbit.zz', 'history', null, '2026-09-23T10:20:00.000Z'],
    ['Hassan', 'archive-house.zz', 'typed', null, '2026-09-23T10:25:00.000Z'],
    ['Hassan', 'garden-radio.zz', 'link', 'archive-house.zz', '2026-09-23T10:32:00.000Z'],
    ['Hassan', 'mirror-hotel.zz', 'link', 'copper-map.zz', '2026-09-23T10:39:00.000Z'],
    ['Sara', 'lantern-market.zz', 'typed', null, '2026-09-23T10:45:00.000Z'],
    ['Sara', 'copper-map.zz', 'link', 'lantern-market.zz', '2026-09-23T10:51:00.000Z'],
    ['Sara', 'blue-door.zz', 'link', 'signal-kitchen.zz', '2026-09-23T10:58:00.000Z'],
] as const;

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        const personModel = app.get<Model<Person>>(getModelToken(Person.name));
        const siteModel = app.get<Model<Site>>(getModelToken(Site.name));
        const visitModel = app.get<Model<Visit>>(getModelToken(Visit.name));

        try {
            await siteModel.collection.dropIndex('name_1');
        } catch {}

        const savedPeople = await Promise.all(
            people.map((name) =>
                personModel.findOneAndUpdate(
                    { name },
                    { name },
                    { upsert: true, new: true },
                ),
            ),
        );

        const peopleByName = new Map(
            savedPeople.map((person) => [
                person.name,
                person.toObject() as SeedPerson,
            ]),
        );

        const getPerson = (name: string) => {
            const person = peopleByName.get(name);

            if (!person) {
                throw new Error(`Missing seeded person: ${name}`);
            }

            return person;
        };

        const savedSites = await Promise.all(
            sites.map((site) => {
                const bodyHtml = sanitizeSiteHtml(site.bodyHtml);
                const textContent = extractTextContent(bodyHtml);

                return siteModel.findOneAndUpdate(
                    { address: site.address },
                    {
                        address: site.address,
                        title: site.title,
                        authorId: getPerson(site.authorName)._id,
                        bodyHtml,
                        textContent,
                    },
                    { upsert: true, new: true },
                );
            }),
        );

        const sitesByAddress = new Map(
            savedSites.map((site) => [
                site.address,
                site.toObject() as SeedSite,
            ]),
        );

        await visitModel.deleteMany({
            personId: { $in: savedPeople.map((person) => person._id) },
        });

        await visitModel.insertMany(
            visitPlan.map(
                ([personName, address, arrivedFrom, referrerAddress, visitedAt]) => {
                    const site = sitesByAddress.get(address);

                    return {
                        personId: getPerson(personName)._id,
                        address,
                        siteId: site?._id ?? null,
                        status: site ? 'found' : 'not_found',
                        arrivedFrom,
                        referrerAddress,
                        titleSnapshot: site?.title ?? null,
                        htmlSnapshot: site?.bodyHtml ?? null,
                        visitedAt: new Date(visitedAt),
                    };
                },
            ),
        );

        console.log('Seed completed');
    } finally {
        await app.close();
    }
}

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});
