# ArcGIS Maps SDK for JavaScript examples

Plain HTML/JavaScript examples published with GitHub Pages.

## Elections AI assistant

[Open the example](https://egreavesesri.github.io/ArcGIS-Maps-SDK-for-Javascript-Examples/elections/)

The example uses ArcGIS Maps SDK for JavaScript 5.1.14 and AI Components (Beta)
with the public [Elections Map](https://www.arcgis.com/home/item.html?id=6da63a7754d24748ac787aeaca12a8fc).
Navigation, data exploration, and help agents provide a conversational interface
to voter turnout and polling stations.

AI features require an eligible ArcGIS Online organizational user, AI assistants
enabled, beta capabilities allowed, the AI assistant role privilege, and access
to the map/layers. Public map access is not anonymous AI access. Use the
assistant's Sign in link; no application API key or custom backend is required.

The map has an embedding resource, but freshness and authenticated AI behavior
must be assessed separately. Do not treat this dataset as current official
voting guidance; confirm voting information with the election authority.
Public sharing does not establish unrestricted reuse rights.

## Embed

```html
<iframe
  src="https://egreavesesri.github.io/ArcGIS-Maps-SDK-for-Javascript-Examples/elections/"
  title="Elections map AI assistant"
  width="100%"
  height="900"
  style="border: 0;"
  loading="lazy"
  allowfullscreen
></iframe>
```

Embedded sign-in can be affected by browser privacy settings and the host's
iframe sandbox or content security policy. If sign-in fails inside an embed,
open the example directly in a new tab. Do not embed credentials or tokens.

## Local development

From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory ".\site"
```

Open http://localhost:8000/elections/. No dependency installation or build is
needed. The CDN and ArcGIS services require an internet connection.

## Deployment

In repository Settings > Pages, select GitHub Actions as the source.
Pushes to main publish the `site` directory using `.github/workflows/pages.yml`.
