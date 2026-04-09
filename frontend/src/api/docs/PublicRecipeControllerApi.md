# PublicRecipeControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**findAll2**](#findall2) | **GET** /api/public/recipes | |

# **findAll2**
> Array<RecipeCatalogItem> findAll2()


### Example

```typescript
import {
    PublicRecipeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PublicRecipeControllerApi(configuration);

const { status, data } = await apiInstance.findAll2();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RecipeCatalogItem>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

